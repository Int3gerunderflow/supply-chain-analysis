import React, {useState,useEffect, useRef} from 'react';
import { useAuth } from './auth';
import axios from 'axios';
import {Map as MapLibreMap, NavigationControl, Popup, useControl} from 'react-map-gl/maplibre';
import {ScatterplotLayer, PathLayer} from 'deck.gl';
import {MapboxOverlay as DeckOverlay} from '@deck.gl/mapbox';
import PostEditor from './postEditor';
import { getCreatorDataContext } from './creatorData';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../stylesheets/creatorPage.css';
import './makeOrEditSUpplier.css';



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
  const {creatorData,setCreatorData} = getCreatorDataContext();

  const supplierHashMap = new Map();

  //section to get the logged in user's ID
  const {token} = useAuth()
  const payloadEncoded = token.split('.')[1]
  const userID = JSON.parse(atob(payloadEncoded)).id

  const [selected, setSelected] = useState(null);

  //create a new data object that holds every supplier in this user's post
  const [supplyData,setSupplyData] = useState([]) //list of every supplier and their details
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
    for(const entry of creatorData.adjacencyList)
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
    setExpAdjList(resultArray)
  }

  useEffect(() => {
      const getSupplierInfo = async () => {
        const supplierList = await getAllSuppliers(creatorData.adjacencyList);
        //Go  through the adjacency list and find the supplier with the ID of the final assembly location
        const finalAssem = supplierList.filter((supplier)=>{return supplier.supplyID === creatorData.finalAssembly})[0]
        setFinalAssem(finalAssem)
        setSupplyData(supplierList)
      };
      getSupplierInfo();
    }, [creatorData]);





//---Toolbar portion---//

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





  //---Supplier creation portion---//

  //flag variable to tell deck to rerender when it changes
  const [supplierUpdated, setSupplierUpdated] = useState(0)
  const currentSupplierIDref = useRef(-1)
  const currentSupplierLat = useRef(0)
  const currentSupplierLong = useRef(0)
  const postID = creatorData.postID

  const MakeOrEditSupplier = () => {
    const [newSupplierName,setNewSupplierName] = useState('')
    const [newSupplierDesc,setNewSupplierDesc] = useState('')

    //method to submit the updated name and description of a supplier
    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8000/posts/supplier/${currentSupplierIDref.current}`,{
          postID,
          name: newSupplierName,
          description: newSupplierDesc,
          latitude: currentSupplierLat,
          longitude: currentSupplierLong
        })
    }

    return(
        <article className="supplierEditor">
            <h4>{currentSupplierIDref.current}</h4>
            <form>
                <label htmlFor='newSupplierName'>Supplier Name</label>
                <input type='text' id='newSupplierName' 
                  onChange={(e)=>setNewSupplierName(e.target.value)}/>
            </form>
            <form>
                <label htmlFor='supplierDesc'>Description</label>
                <input type='text' id='supplierDesc' onChange={(e)=>setNewSupplierDesc(e.target.value)}/>
            </form>
            <button type='submit' onClick={handleSubmit}>Save</button> 
        </article>
    )
  }

  const handleMapClick = async (e) => {
    const long = e.lngLat.lng
    const lat = e.lngLat.lat 


    /*
    The moment a click happens and the add supplier tool is active a
    new supplier with a blank name and description and with the
    coordinates of wherever the user clicked is created on the backend.
    This is so a supplyID can be given to the newly created supplier.
    Once a user completes the form to name the supplier and give it a
    description a PUT request will be sent to update the supplier via
    the ID we got from creating it.
    */
    if(action === toolAction.addSupplier)
    {
      let supplierList = supplyData
      await axios.post(`http://localhost:8000/posts/supplier`,{
        postID,
        name: 'unnamed',
        description: 'no description',
        latitude: lat,
        longitude: long
      }).then((response)=>{
        const supplyID = response.data.insertId
        currentSupplierIDref.current = supplyID
        currentSupplierLat = lat
        currentSupplierLong = long

        //separate supplier object that has a supplyID
        const newSupplier = {
          supplyID,
          postID,
          name: 'unamed',
          description: 'no description',
          longitude: long,
          latitude: lat        
        }
        
        //update the supplyData list with our new supplier
        supplierList.push(newSupplier)
        setSupplyData(supplierList)

        //update the adjacency list
        let updatedcreatorData = creatorData
        const newVertexInAdjList = {
          [supplyID]:[]
        }
        updatedcreatorData.adjacencyList.push(newVertexInAdjList)
        setCreatorData(updatedcreatorData)


        //for some reason deck.gl won't rerender based soley off if the
        //supplyData array changes or not. We have to force the layer to
        //rerender every time it sees the supplierUpdated variable change
        setSupplierUpdated(Math.random())
      }) 
    }
  }

  
  
  //putting in the layers on top of the map
  const layers = [
    new ScatterplotLayer({
      id: "scatterplot",
      // data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
      data: supplyData,

      getPosition: (d) => {
        const result = [d.longitude,d.latitude]
        return result
      },
      getRadius: 25,
      getFillColor: [255, 140, 0,180],
      getLineColor: [0, 0, 0],
      highlightColor: [200,0,80,128],
      getLineWidth: 10,
      radiusScale: 5000,
      pickable: true,
      autoHighlight: true,
      onClick: info => {
        setSelected(info.object),
        currentSupplierIDref.current = info.object.supplyID
      },
      updateTriggers:{
        getPosition: [supplierUpdated]
      }
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
    <div className='toolContainer'>
      <ToolBar/>
    </div>
    <PostEditor userIDprop={userID} adjListprop={2}/>
    <MakeOrEditSupplier/>
    <MapLibreMap initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE} dragRotate={false} onClick={(e)=>handleMapClick(e)}>
      {selected && (
        <Popup
          key={selected.supplyID}
          anchor="bottom"
          style={{zIndex: 10}} /* position above deck.gl canvas */
          longitude={selected.longitude}
          latitude={selected.latitude}
          onClose={()=>setSelected(null)}
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