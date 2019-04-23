import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { GOOGLE_API } from '../../../config';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }
  
  onMarkerClick(props, marker, e) {
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props
    });
  }

  onClose(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    let markers = this.props.properties.map((property, i) => {
      let markerColor = property.marketValue <= 400000 ? 'green-dot.png' : property.marketValue > 400000 && property.marketValue <= 500000 ? 'yellow-dot.png' : 'red-dot.png';
      return (
          <Marker key={'marker' + i}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/' + markerColor
            }}
            onClick={this.onMarkerClick}
            name={property.address}
            marketValue={property.marketValue}
            position={{lat: property.longitude, lng: property.latitude}}
          />
        );
    });

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 41.8649654,
         lng: -87.6659458
        }}
      >
        {markers}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            <p>Estimated Market Value: ${this.state.selectedPlace.marketValue}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API
})(MapContainer);