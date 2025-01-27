import React, {useState,useEffect} from 'react';
import { getMapDataContext } from './mapData';
import axios from 'axios';
import {Map, NavigationControl, Popup, useControl} from 'react-map-gl/maplibre';
import {ScatterplotLayer, ArcLayer} from 'deck.gl';
import {MapboxOverlay as DeckOverlay} from '@deck.gl/mapbox';
import 'maplibre-gl/dist/maplibre-gl.css';



// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

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
  const {graphData,setadjList} = getMapDataContext()
  const [selected, setSelected] = useState(null);

  //create a new data object that holds every supplier in this user's post
  const [supplyData,setSupplyData] = useState([]) //list of every supplier
  const [finalAssemblyLocation, setFinalAssem] = useState(0)

  const getAllSuppliers = async (adjList) => {
    const suppliersArray = []
    for(const element of adjList)
    {
      await axios.get(`http://localhost:8000/posts/supplier/${Number(Object.keys(element)[0])}`)
         .then((reply)=>suppliersArray.push(reply.data))
    }
    return suppliersArray
  }

  useEffect(() => {
    const getSupplierInfo = async () => {
      const adjList = await getAllSuppliers(graphData.adjacencyList);
      setFinalAssem(graphData.finalAssembly)
      setSupplyData(adjList)
    };
    getSupplierInfo();
  }, []);
  
  //putting in the layers on top of hte map
  const layers = [
    new ScatterplotLayer({
      id: "scatterplot",
      // data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
      data: supplyData,

      getPosition: (d) => {
        const coordinates = [d.longitude,d.latitude]
        console.log(coordinates)
        return coordinates
      },
      getRadius: 25,
      getFillColor: [255, 140, 0,180],
      getLineColor: [0, 0, 0],
      highlightColor: [200,0,80,128],
      getLineWidth: 10,
      radiusScale: 5000,
      pickable: true,
      autoHighlight: true
    }),
    new ArcLayer({
      id: 'arcs',
      data: AIR_PORTS,
      dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: f => [-0.4531566, 51.4709959], // London
      getTargetPosition: f => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1
    })
  ];

  return (
    <Map initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE}>
      {selected && (
        <Popup
          key={selected.properties.name}
          anchor="bottom"
          style={{zIndex: 10}} /* position above deck.gl canvas */
          longitude={selected.geometry.coordinates[0]}
          latitude={selected.geometry.coordinates[1]}
        >
          {selected.properties.name} ({selected.properties.abbrev})
          <p>{selected.properties.wikipedia}</p>
        </Popup>
      )}
      <DeckGLOverlay layers={layers} /* interleaved*/ />
      <NavigationControl position="top-left" />
    </Map>
  );
}

export default MapPage

/* global document */
// const container = document.body.appendChild(document.createElement('div'));
// createRoot(container).render(<Root />);