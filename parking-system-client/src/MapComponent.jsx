import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: null, // No default location set initially
      loading: true, // Manage loading state
      errorMessage: null // Error message for UI feedback
    };
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.handleGetCurrentLocation();
  }

  handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.setState({ userLocation, loading: false, errorMessage: null });
          this.loadPlaces(userLocation);
        },
        error => {
          console.error('Error getting user location:', error);
          this.setState({
            loading: false,
            userLocation: null, // Ensure location is null if geolocation fails
            errorMessage: "Geolocation failed. Please reload the page."
          });
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.setState({
        loading: false,
        userLocation: null, // Ensure location is null if geolocation is not supported
        errorMessage: "Geolocation is not supported by this browser. Please reload the page."
      });
    }
  };

  loadPlaces(userLocation) {
    const { google } = this.props;
    const map = this.mapRef.current.map;

    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: userLocation,
      radius: '1000', // Adjust radius as needed
      type: ['store', 'restaurant', 'gym', 'Car Parking - AIT'] // Specify types of places to find
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log("Places found:", results);
        results.forEach(place => {
          const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name // Optional: add other place details here
          });

          // Make each place marker clickable and send location to the server when clicked
          marker.addListener('click', () => {
            const clickedLocation = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              placeName: place.name // Optional: send place name or other details
            };
            console.log('Clicked place:', clickedLocation);

            // Send clickedLocation to server
            fetch('http://localhost:3000/api/saveLocation', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(clickedLocation),
            })
            .then(response => response.json())
            .then(data => {
              console.log('Response from server:', data);
            })
            .catch(error => {
              console.error('Error sending data to server:', error);
            });
          });
        });
      }
    });
  }


  handleMapClick = (mapProps, map, clickEvent) => {
    const clickedLocation = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
    };
    console.log('Clicked location:', clickedLocation);

    // Send clickedLocation to server
    fetch('http://localhost:3000/api/saveLocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickedLocation),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from server:', data);
    })
    .catch(error => {
      console.error('Error sending data to server:', error);
    });
  };

  render() {
    const { userLocation, errorMessage } = this.state;
    const { google } = this.props;

    return (
      <div>
        <Map
          google={google}
          zoom={14}
          center={userLocation || { lat: 18.6055108, lng: 73.8763451 }} // Center on default coordinates if no user location
          ref={this.mapRef}
          onClick={this.handleMapClick}
          style={{ width: '100%', height: '100%' }}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              }}
            />
          )}
        </Map>
        {errorMessage && <div style={{ color: 'red', position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
          {errorMessage}
        </div>}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  libraries: ['places']
})(MapComponent);