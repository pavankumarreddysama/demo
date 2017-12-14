import React, { Component } from 'react';
import '../assets/css/App.css'
import { Image } from 'cloudinary-react';
import LazyLoad from 'react-lazy-load';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import $ from 'jquery';

let dataMap = [];
let locationvalue = [];
let propertyvalue = [];

class Searchbar extends Component {


  constructor(props) {
    super(props);

    this.state = {
      dataMap: [],
      locationvalue: '',
      propertyvalue: '',
    }

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePropertyChange = this.handlePropertyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.callback = this.callback.bind(this);
  };
  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  /*callApi(){ 
     fetch('http://192.168.1.207:3000/getAllProperties')
    .then((result) => {
       return result.json();
    }).then((responseJson) => {
      // Do something with the result
      console.log(responseJson);
     /* data = responseJson.developer;
      this.setState({dataMap: data});
      console.log(data)
      this.setState({dataMap: responseJson});
     
 
      
    })
  }*/


  componentDidMount() {
    var local = JSON.parse(localStorage.getItem("Favorite")) == null ? [] : JSON.parse(localStorage.getItem("Favorite"));
    var array1 = [];
    var array2 = [];
    var array3 = [];
    fetch('http://localhost:4000/filterProperties')
      .then((result) => {
        return result.json();
      }).then((responseJson) => {
        // Do something with the result
        console.log(responseJson);

       for (var i = 0; i < responseJson.length; i++) {
          array1.push(responseJson[i].publicId);
        }
        for (var j = 0; j < local.length; j++) {
          array2.push(local[j].publicId);
        }
        for (var k = 0; k < array1.length; k++) {
          if (array2.indexOf(array1[k]) !== -1) { array3.push(array1[k]); }
        }
        if (array2.length === array3.length) {
          for (var l = 0; l < responseJson.length; l++) {
            responseJson[l]["isChecked"] = "false";
            for (var m = 0; m < array3.length; m++) {
              if (responseJson[l].publicId === array3[m]) {
                responseJson[l]["isChecked"] = "true";
                break;
              }
            }
          }
        }
         this.setState({ dataMap: responseJson });
        localStorage.setItem("response", JSON.stringify(responseJson));
      })
  }



  componentDidUpdate() {
    $('.fav').one('click', function () {
      var publicId = $(this).closest("tr").children('td:eq(0)').text();
      var developer = $(this).closest("tr").children('td:eq(3)').text();
      var propertyType = $(this).closest("tr").children('td:eq(4)').text();
      var location = $(this).closest("tr").children('td:eq(5)').text();
      var isCheckBoxChecked =  $(this).closest("tr").children('td:eq(1)').text();
      var buildingObject = {
        publicId: '',
        developer: '',
        propertyType: '',
        location: '',
        isChecked : '',
      };
      buildingObject['publicId'] = publicId;
      buildingObject['developer'] = developer;
      buildingObject['propertyType'] = propertyType;
      buildingObject['location'] = location;
      buildingObject['isChecked'] = isCheckBoxChecked;
      var arrayobj = JSON.parse(localStorage.getItem("Favorite")) == null ? [] : JSON.parse(localStorage.getItem("Favorite"));
      arrayobj.push(buildingObject);
      var newArray = {};
      arrayobj = arrayobj.filter(function(buildingObject) {
          if (buildingObject.publicId in newArray) {
              return false;
          } else {
            newArray[buildingObject.publicId] = true;
              return true;
          }
      }); 
      
      var sortByProperty = function (property) {
        return function (x, y) {
            return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        };
    };
    arrayobj.sort(sortByProperty('developer'));
    console.log(JSON.stringify(arrayobj.sort(sortByProperty('developer'))));
    localStorage.setItem("Favorite", JSON.stringify(arrayobj.sort(sortByProperty('developer'))));
});
  }


  handleLocationChange(event) {
    this.setState({ locationvalue: event.target.value });
    console.log(locationvalue)

  }

  handlePropertyChange(event) {
    this.setState({ propertyvalue: event.target.value });
    console.log(propertyvalue)
  }

  handleSubmit(event) {
    if (!this.state.locationvalue && !this.state.propertyvalue) {

    }
    else {
      fetch('http://localhost:4000/filterProperties?location=' + this.state.locationvalue + '&propertyType=' + this.state.propertyvalue)
        .then((result) => {
          return result.json();
        }).then((responseJson) => {
          // Do something with the result
          console.log(responseJson);
          this.setState({ dataMap: responseJson });
          console.log(dataMap);

        })
      event.preventDefault();
    }
  }

  callback(event, isInputChecked) {
    if(isInputChecked ===false){
      $('.fav').on('change', function () {
        var publicId = $(this).closest("tr").children('td:eq(0)').text();
        var json = JSON.parse(localStorage.getItem('Favorite'));
        for (var i = 0; i < json.length; i++)
          if (json[i].publicId === publicId) json.splice(i, 1);
        document.location.reload(true);
        localStorage.setItem('Favorite',JSON.stringify(json));
  
      });
    }
  }

  remove(value) {
    if (value === "true") {
      return true;
    }
    return false;
  }

  render() {
    const styles = {
      block: {
        maxWidth: 250,
      },
      checkbox: {
        marginBottom: 16,
      },
    };

    return (

      <div className="container">
        <div className="searchformcontainer">
          <h4>Search Property</h4>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>
                Location:
                <input type="text" placeholder="Location.." className="form-control" value={this.state.locationvalue} onChange={this.handleLocationChange} />
              </label>
            </div>
            <div className="form-group">
              <label>
                Bedrooms:
                  <select value={this.state.propertyvalue} onChange={this.handlePropertyChange} className="form-control">
                  <option value="">Select</option>
                  <option value="3BHK">3BHK</option>
                  <option value="4BHK">4BHK</option>
                </select>
              </label>
            </div>
            <input type="submit" value="Submit" className="btn btn-success" />
          </form>
        </div>

        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Image</th><th>Company</th><th>Property Type</th><th>Location</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.dataMap.map((item, i) => (
                  <tr key={i}>
                    <td className="hidden">{item.publicId}</td>
                    <td className="hidden">{item.isChecked}</td>
                                        <td><div>
                      <LazyLoad height={150} offsetVertical={0} >
                        <Image cloudName="ddpnorggf" publicId={item.publicId} width="200" height="100" crop="scale" />
                      </LazyLoad></div>
                    </td><td>{item.developer}</td><td>{item.propertyType}</td><td>{item.location}</td>
                    <td >
                      <MuiThemeProvider>
                        <div style={styles.block} >
                          <Checkbox
                            className="fav"
                            iconStyle={{ fill: 'red' }}
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder />}
                            onCheck={this.callback}
                            style={styles.checkbox}
                            defaultChecked={this.remove(item.isChecked)}
                          />

                        </div>
                      </MuiThemeProvider>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );

  }
}

export default Searchbar;
