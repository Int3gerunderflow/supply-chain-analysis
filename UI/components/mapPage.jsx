import React, {useState,useEffect} from 'react';
import { getMapDataContext } from './mapData';
import axios from 'axios';
import {Map as MapLibreMap, NavigationControl, Popup, useControl} from 'react-map-gl/maplibre';
import {ScatterplotLayer, ArcLayer} from 'deck.gl';
import {MapboxOverlay as DeckOverlay} from '@deck.gl/mapbox';
import PostInfoCard from './postInfoCard';
import SupplierInfoCard from './supplyInfoCard';
import 'maplibre-gl/dist/maplibre-gl.css';



const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
function DeckGLOverlay(props) {
  const overlay = useControl(() => new DeckOverlay(props));
  overlay.setProps(props);
  return null;
}



function MapPage() {
  const {graphData,setsuppData} = getMapDataContext()
  const [selected, setSelected] = useState(null);
  const [postInfo, setPostsInfo] = useState({})
  const postID = graphData.postID

  //make an api call to get the details of this post
  useEffect(()=>{
    const getPostDetails = async ()=>{
      try{
        const response = await axios.get(`http://localhost:8000/posts/${postID}`)
        const {product, company, description} = response.data
        setPostsInfo({product,company,description})
      }
      catch(error)
      {
        console.log(error)
      }
    }
    getPostDetails()
  }, [])

  const supplierHashMap = new Map();

  //create a new data object that holds every supplier in this user's post
  const [supplyData,setSupplyData] = useState([]) //list of every supplier
  const [expandedAdjList, setExpAdjList] = useState([]) //array where every item contains a source and target destination
  const [finalAssemblyLocation, setFinalAssem] = useState(0)

  //transform and format the adjacency list so that deck.gl can render properly
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
    setExpAdjList(resultArray)
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
    new ArcLayer({
      id: 'arcs',
      data: expandedAdjList,
      // dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: f => [f.source[0], f.source[1]], // Wherever the final location is
      getTargetPosition: f => [f.target[0], f.target[1]],
      getSourceColor: [255, 140, 0],
      getTargetColor: [255, 84, 175],
      getWidth: 1,
      getHeight: 0.5,
    })
  ];

  return (
    <>
      <PostInfoCard product={postInfo.product} company={postInfo.company} description={postInfo.description}/>
      {/* <SupplierInfoCard name={selected.name || ''} description={selected.description || ''}/> */}
      <MapLibreMap initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE} dragRotate={false}
        onClick={(e)=>setSelected(null)}>
        {selected && (
                <Popup
                  key={selected.supplyID}
                  anchor="bottom"
                  style={{zIndex: 5}} /* position above deck.gl canvas */
                  longitude={selected.longitude}
                  latitude={selected.latitude}
                  onClose={()=>{
                    setSelected(null)
                  }}
                >
                  <h4>{selected.name}</h4>
                  <p>{selected.description}</p>
                </Popup>
              )}        
        <DeckGLOverlay layers={layers} /* interleaved*/ />
        <NavigationControl position="top-right" />
      </MapLibreMap>
    </>
  );
}

export default MapPage

/* global document */
// const container = document.body.appendChild(document.createElement('div'));
// createRoot(container).render(<Root />);