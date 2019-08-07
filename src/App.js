import React from 'react';
import ReactDOM from 'react-dom';
import CSVReader from 'react-csv-reader';
import {Motion} from 'react-motion';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function showMap(ms){
  console.log(ms);
  const items = []

  for (const [index, value] of ms.entries()) {
    items.push(
      <Marker
      key={'m'+index}
         marker={{coordinates: value}}
         style={{
           default: { fill: "#FF5722" },
           hover: { fill: "#FFFFFF" },
           pressed: { fill: "#FF5722" },
         }}
      >
         <circle
            cx={0}
            cy={0}
            r={5}
            style={{
              stroke: "#FF5722",
              strokeWidth: 3,
              opacity: 0.9,
            }}
         />
      </Marker>
    )
  }

  return (<div>
  <ComposableMap
  projectionConfig={{ scale: 2000 }}
  >
    <ZoomableGroup  center={[ 121, 14 ]}>
    <Geographies geography={ "./world-50m.json" }>
      {(geographies, projection) => geographies.map(geography => (
        <Geography
          key={ geography.id }
          geography={ geography }
          projection={ projection }
          style={{
          default: { fill: "#666" },
          hover:   { fill: "#999" },
          pressed: { fill: "#000" },
        }}/>
      ))}
    </Geographies>
    <Markers>
      {items}
</Markers>
    </ZoomableGroup>
  </ComposableMap>
  </div>
  )
}

function handleForce(data){
//  console.log(data);
//document.getElementById('root').innerHTML = '<pre>'+data+'</pre>';
var html='<div class="container-fluid"><div class="row"><div id="t" class="col-md-5"><table class="table table-striped"><thead class="thead-dark"><tr>';
html+='<th scope="col">LINK</th>';
html+='<th scope="col">Density</th>';
html+='</tr></thead><tbody class="">';
data = data.reverse();
var msMain=[];
for(var row=1; row<(data.length-1); row++){
    html+='<tr>';
    html+='<td>'+row+'. <a href="https://www.google.com/maps/@'+data[row][0]+','+data[row][1]+',15z" target="_blank">'+'Open Map</a></td>';
    html+='<td>'+data[row][2]+'</td>';
    html+='</tr>';
    msMain.push([data[row][1],data[row][0]]);
}
html+='</tbody></table></div><div id="m" class="col-md-7">';
html+='</div></div></div>';

document.getElementById('root').innerHTML = html;
ReactDOM.render(showMap(msMain), document.getElementById('m'));
};

function App() {
  return (
    <div className="App">
<CSVReader
        cssClass="csv-reader-input"
        label=""
        onFileLoaded={handleForce}
        inputId="f"
        inputStyle={{color: 'red'}}
      />
    </div>
  );
}

export default App;
