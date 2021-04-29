import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import * as MapHelper from "./helpers/_map";
import DEVICES from "./helpers/_devices";
import truck from "./icons/truck.svg";

/**
 * Map Container handles /map. Map is from Google Maps API
 * This Class is responsible for:
 * 1. Showing the map at correct location
 * 2. Handling user clicks
 * 3. Showing correct information
 */
class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <Map google={window.google}
                onClick={this.onMapClicked}
                containerStyle={MapHelper.CONTAINER_STYLE}
                zoom={7}
                /**
                 * Setting Options
                 * We can set some of them to true but I decided not to in this project
                 */
                initialCenter={MapHelper.TURKEY_COORDS}
                scrollwheel={false}
                draggable={false}
                zoomControl={false}
                fullscreenControl={false}
                streetViewControl={false}
                panControl={false}
                keyboardShortcuts={false}
                mapTypeControl={false}
            >
                <Marker
                    position={{
                        lat: DEVICES[0].LATITUDE,
                        lng: DEVICES[0].LONGITUDE
                    }}
                    name={DEVICES[0].NAME}
                    onClick={this.onMarkerClick}
                    icon={{
                        url: truck,
                        anchor: new window.google.maps.Point(32, 32),
                        scaledSize: new window.google.maps.Size(64, 64)
                    }}
                    errMessage={DEVICES[0].ERROR}
                    date={DEVICES[0].DATE}
                    capacity={DEVICES[0].CAPACITY}
                />
                <Marker
                    name={DEVICES[1].NAME}
                    position={{
                        lat: DEVICES[1].LATITUDE,
                        lng: DEVICES[1].LONGITUDE
                    }}
                    onClick={this.onMarkerClick}
                    icon={{
                        url: truck,
                        anchor: new window.google.maps.Point(32, 32),
                        scaledSize: new window.google.maps.Size(64, 64)
                    }}
                    errMessage={DEVICES[1].ERROR}
                    date={DEVICES[1].DATE}
                    capacity={DEVICES[1].CAPACITY}
                />
                <Marker
                    name={DEVICES[2].NAME}
                    position={{
                        lat: DEVICES[2].LATITUDE,
                        lng: DEVICES[2].LONGITUDE
                    }}
                    onClick={this.onMarkerClick}
                    icon={{
                        url: truck,
                        anchor: new window.google.maps.Point(32, 32),
                        scaledSize: new window.google.maps.Size(64, 64)
                    }}
                    errMessage={DEVICES[2].ERROR}
                    date={DEVICES[2].DATE}
                    capacity={DEVICES[2].CAPACITY}
                />
                <Marker
                    name={DEVICES[3].NAME}
                    position={{
                        lat: DEVICES[3].LATITUDE,
                        lng: DEVICES[3].LONGITUDE
                    }}
                    onClick={this.onMarkerClick}
                    icon={{
                        url: truck,
                        anchor: new window.google.maps.Point(32, 32),
                        scaledSize: new window.google.maps.Size(64, 64)
                    }}
                    errMessage={DEVICES[3].ERROR}
                    date={DEVICES[3].DATE}
                    capacity={DEVICES[3].CAPACITY}
                />
                <Marker
                    name={DEVICES[4].NAME}
                    position={{
                        lat: DEVICES[4].LATITUDE,
                        lng: DEVICES[4].LONGITUDE
                    }}
                    onClick={this.onMarkerClick}
                    icon={{
                        url: truck,
                        anchor: new window.google.maps.Point(32, 32),
                        scaledSize: new window.google.maps.Size(64, 64)
                    }}
                    errMessage={DEVICES[4].ERROR}
                    date={DEVICES[4].DATE}
                    capacity={DEVICES[4].CAPACITY}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h5><strong>{this.state.selectedPlace.name}</strong></h5>
                        <h6>Device Status: <strong>{this.state.selectedPlace.errMessage
                            ? this.state.selectedPlace.errMessage : "OK"}</strong></h6>
                        <h6>Last Movement Date: <strong>{this.state.selectedPlace.date}</strong></h6>
                        <div>
                            <h6 className="left-align">Capacity:
                            <span className="right">{this.state.selectedPlace.capacity}/100</span></h6>
                            <div className="progress">

                                <div className="determinate"
                                    style={{
                                        width: this.state.selectedPlace.capacity + "%",
                                        height: "30px",
                                        background: parseInt(this.state.selectedPlace.capacity) >= 90 ? "red" : 
                                        parseInt(this.state.selectedPlace.capacity) >= 50 ? "orange" : "green" 
                                    }}
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBIWpcwd-OHJqfJOCykfOzMJ6XuvLqAIbc"
})(MapContainer);
