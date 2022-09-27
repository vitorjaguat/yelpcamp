
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/light-v10', // style URL
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 5, // starting zoom
// projection: 'globe' // display the map as a 3D globe
});
// map.on('style.load', () => {
// map.setFog({}); // Set the default atmosphere style
// });

//Map navigation controls:
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        .setHTML(
            `<p>${campground.title}</p>`
        )
    )
    .addTo(map)