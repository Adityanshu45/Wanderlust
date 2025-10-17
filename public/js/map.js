

const mapToken = GoogleMap;
  if (!mapToken) {
      console.error("Missing Google Maps API Token!");
  }
  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: mapToken,
    v: "weekly",
  });

// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  let coordinates=listing.geometry.coordinates;
  let listingPosition;
  if (typeof coordinates !== 'undefined' && Array.isArray(coordinates) && coordinates.length === 2) {
    listingPosition = { lat: coordinates[1], lng: coordinates[0] };
  } else {
    listingPosition = { lat: 28.7041, lng: 77.1025 }; // fallback to Delhi
  }
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 6,
    center: listingPosition,
    mapId: "DEMO_MAP_ID",
  });
  

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position:listingPosition,
    title: "Uluru",
  }); 

  // === Add InfoWindow popup ===
  const infoWindow = new google.maps.InfoWindow({
    content: `<h5>${listing.location}</h5><p>Exact location provided after booking</p>`,
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
}

initMap();

