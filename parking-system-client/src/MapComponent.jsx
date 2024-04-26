import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: null,
    };
    this.handleGetCurrentLocation = this.handleGetCurrentLocation.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleGetCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.setState({ userLocation }, () => {
            const { userLocation } = this.state;
            if (userLocation) {
              const map = this.mapRef.map;
              map.setCenter(userLocation);
            }
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  handleMapClick(mapProps, map, clickEvent) {
    const clickedLocation = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    };
    console.log('Clicked locaghgfhftion:', clickedLocation);

    // Send clickedLocation to server
    fetch('/api/saveLocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickedLocation),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from server:', data);
      })
      .catch(error => {
        console.error('Error sending data to server:', error);
      });
  }

  render() {
    const { userLocation } = this.state;
    const { google } = this.props;

    return (
      <div>
        <button onClick={this.handleGetCurrentLocation}>Get Current Location</button>
        <Map
          google={google}
          zoom={14}
          initialCenter={userLocation || { lat: 37.7749, lng: -122.4194 }}
          ref={(ref) => (this.mapRef = ref)}
          onClick={this.handleMapClick}
        >
          {userLocation && (
            <Marker
              position={{ lat: userLocation.lat, lng: userLocation.lng }}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              }}
            />
          )}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDoCYpLl67EWaoodKJS4G1rjdZdcrLvoew'
})(MapComponent);



//AIzaSyDoCYpLl67EWaoodKJS4G1rjdZdcrLvoew
