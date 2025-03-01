import React, {useState,useEffect} from 'react';
import { getMapDataContext } from './mapData';
import { useAuth } from './auth';
import axios from 'axios';
import {Map as MapLibreMap, NavigationControl, Popup, useControl} from 'react-map-gl/maplibre';
import {ScatterplotLayer, PathLayer} from 'deck.gl';
import {MapboxOverlay as DeckOverlay} from '@deck.gl/mapbox';
import PostEditor from './postEditor';
import 'maplibre-gl/dist/maplibre-gl.css';
import './creatorPage.css';



const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
function DeckGLOverlay(props) {
  const overlay = useControl(() => new DeckOverlay(props));
  overlay.setProps(props);
  return null;
}



function CreatorPage() {
  const {graphData,setsuppData} = getMapDataContext()

  //section to get the logged in user's ID
  const {token} = useAuth()
  const payloadEncoded = token.split('.')[1]
  const userID = JSON.parse(atob(payloadEncoded)).id

  const [selected, setSelected] = useState(null);
  const supplierHashMap = new Map();

  //create a new data object that holds every supplier in this user's post
  const [supplyData,setSupplyData] = useState([]) //list of every supplier
  const [expandedAdjList, setExpAdjList] = useState([]) //array where every item contains a source and target destination
  const [finalAssemblyLocation, setFinalAssem] = useState(0)

  const getAllSuppliers = async (suppData) => {
    const suppliersArray = []
    for(const element of suppData)
    {
      await axios.get(`http://localhost:8000/posts/supplier/${Number(Object.keys(element)[0])}`)
         .then((reply)=>{
            suppliersArray.push(reply.data);
            supplierHashMap.set(Number(Object.keys(element)[0]), reply.data)
        })
    }
    //once the hashmap is set also set up the expanded adjacency list
    populateExpandedAdjList();
    return suppliersArray
  }

  //method to convert the adjacencyList to an array of sources and targets so that deck.gl can properly visualize the data
  const populateExpandedAdjList = () => {
    const resultArray = []
    const seenVerticies = new Set() //create a hashset to keep track of which vertices we have already seen to avoid duplicates
    for(const entry of graphData.adjacencyList)
    {
      const vertex = Number(Object.keys(entry)[0])
      const neighbors = Object.values(entry)[0]
      for(let n of neighbors)
      {
        if(seenVerticies.has(n))
        {
          continue;
        }
        const srcLongitude = supplierHashMap.get(vertex).longitude
        const srcLatitude = supplierHashMap.get(vertex).latitude
        const nLongitude = supplierHashMap.get(n).longitude
        const nLatitude = supplierHashMap.get(n).latitude
        resultArray.push({
          "source": [srcLongitude,srcLatitude],
          "target": [nLongitude, nLatitude]
        })
      }
      seenVerticies.add(vertex)
    }
    console.log(resultArray)
    setExpAdjList(resultArray)
  }

  useEffect(() => {
    const getSupplierInfo = async () => {
      const suppData = await getAllSuppliers(graphData.adjacencyList);
      //Go  through the adjacency list and find the supplier with the ID of the final assembly location
      const finalAssem = suppData.filter((supplier)=>{return supplier.supplyID === graphData.finalAssembly})[0]
      setFinalAssem(finalAssem)
      setSupplyData(suppData)
    };
    getSupplierInfo();
  }, []);

  //state representing which tool has been selected
  const [action, setAction] = useState("none")
  const [factoryColor, setFactoryColor] = useState('rgb(255,255,255')
  const [relationColor, setRelationColor] = useState('rgb(255,255,255')
  const [deleteColor, setDeleteColor] = useState('rgb(255,255,255')
  const [addSupplierInfo, setAddSupplierInfo] = useState({})

  const toolAction = {
    addSupplier: "addSupplier",
    addRelation: "addRelation",
    delete: "delete",
    none: "none"
  }

  const setToolStatus = (tool) => {
    if(tool === toolAction.addSupplier)
    {
        if(action === toolAction.addSupplier)
        {
            setAction(toolAction.none)
            setFactoryColor('rgb(255,255,255)')
            setRelationColor('rgb(255,255,255)')
            setDeleteColor('rgb(255,255,255)')
        }
        else
        {
            setAction(toolAction.addSupplier)
            setFactoryColor('rgb(179, 179, 179)')
            setRelationColor('rgb(255,255,255)')
            setDeleteColor('rgb(255,255,255)')

        }
    }
    if(tool === toolAction.addRelation)
    {
        if(action === toolAction.addRelation)
        {
            setAction(toolAction.none)
            setFactoryColor('rgb(255,255,255)')
            setRelationColor('rgb(255,255,255)')
            setDeleteColor('rgb(255,255,255)')
        }
        else
        {
            setAction(toolAction.addRelation)
            setFactoryColor('rgb(255, 255, 255)')
            setRelationColor('rgb(179,179,179)')
            setDeleteColor('rgb(255,255,255)')
        }
    }
    if(tool === toolAction.delete)
        {
            if(action === toolAction.delete)
            {
                setAction(toolAction.none)
                setFactoryColor('rgb(255,255,255)')
                setRelationColor('rgb(255,255,255)')
                setDeleteColor('rgb(255,255,255)')
            }
            else
            {
                setAction(toolAction.delete)
                setFactoryColor('rgb(255,255,255)')
                setRelationColor('rgb(255,255,255)')
                setDeleteColor('rgb(179, 179, 179)')
            }
        }
  }

  //toolbar for the user to select what they want to add on the map
  const ToolBar = () => {
    return (
        <div className='tool'>
            <img src='../assets/industry-alt.png' 
                onClick={()=>setToolStatus(toolAction.addSupplier)}
                onMouseEnter={(e)=>e.target.style.backgroundColor = 'rgb(179, 179, 179)'}
                onMouseLeave={(e)=>e.target.style.backgroundColor = factoryColor}/>
            <img src='../assets/connection.png' 
                onClick={()=>setToolStatus(toolAction.addRelation)}
                onMouseEnter={(e)=>e.target.style.backgroundColor = 'rgb(179, 179, 179)'}
                onMouseLeave={(e)=>e.target.style.backgroundColor = relationColor}/>
            <img src='../assets/cross.png' 
                onClick={()=>setToolStatus(toolAction.delete)}
                onMouseEnter={(e)=>e.target.style.backgroundColor = 'rgb(179, 179, 179)'}
                onMouseLeave={(e)=>e.target.style.backgroundColor = deleteColor}/>
            <p>{action}</p>
        </div>
    )
  }

  const handleMapClick = (e) => {
    const long = e.lngLat.lng
    const lat = e.lngLat.lat 
    if(action === toolAction.addSupplier)
    {

    }
  }
  
  //putting in the layers on top of the map
  const layers = [
    new ScatterplotLayer({
      id: "scatterplot",
      // data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
      data: supplyData,

      getPosition: (d) => {
        const coordinates = [d.longitude,d.latitude]
        return coordinates
      },
      getRadius: 25,
      getFillColor: [255, 140, 0,180],
      getLineColor: [0, 0, 0],
      highlightColor: [200,0,80,128],
      getLineWidth: 10,
      radiusScale: 5000,
      pickable: true,
      autoHighlight: true,
      onClick: info => setSelected(info.object)
    }),
    new PathLayer({
        id: '2dpaths',
        data: expandedAdjList,
        getColor:[234, 60, 152],
        getWidth: 4,
        widthUnits: 'pixels',
        getPath: d => [[d.source[0], d.source[1]],[d.target[0], d.target[1]]],
        pickable: true
    })
  ];

  return (
    <>
    {/* <ToolBar/> */}
    <PostEditor userIDprop={userID}/>
    <MapLibreMap initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE} dragRotate={false} onClick={(e)=>handleMapClick(e)}>
      {selected && (
        <Popup
          key={selected.supplyID}
          anchor="bottom"
          style={{zIndex: 10}} /* position above deck.gl canvas */
          longitude={selected.longitude}
          latitude={selected.latitude}
        >
          {selected.name} ({selected.description})
        </Popup>
      )}
      <DeckGLOverlay layers={layers} /* interleaved*/ />
      <NavigationControl position="top-right" />
    </MapLibreMap>
    </>
  );
}

export default CreatorPage