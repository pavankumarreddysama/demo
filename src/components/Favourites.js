import React, { Component } from 'react';
import { Image } from 'cloudinary-react';
import $ from 'jquery';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
let data = [];
class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMap: [],

    };
  }

  componentDidMount() {
    if (localStorage.getItem("Favorite") !== null) {
      data = JSON.parse(localStorage.getItem('Favorite'));
      console.log(data);
      this.setState({ dataMap: data });
    }
  }
  componentDidUpdate() {
    $('.fav').off().on('click', function () {
      var publicId = $(this).closest("tr").children('td:eq(0)').text();
      var json = JSON.parse(localStorage.getItem('Favorite'));
      for (var i = 0; i < json.length; i++)
        if (json[i].publicId === publicId) json.splice(i, 1);
      document.location.reload(true);
      localStorage.setItem('Favorite',JSON.stringify(json));

    });
  }

  render() {
    const style = {
      right: 20,
      bottom: 12,
      left: 'auto',
      
  };
    return (
      <div className="container">
        <div className="greetingsText">
          <h3><u>Favourites List</u> :</h3>
          <div>
            <table className="table table-hover" id="tableId">
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
                      <td>{item.id}
                        <Image cloudName="ddpnorggf" publicId={item.publicId} width="200" height="100" crop="scale" />
                      </td>
                      <td>{item.developer}</td><td>{item.propertyType}</td><td>{item.location}</td>
                      <td className="test" >
                      <MuiThemeProvider>
                      <IconButton className="fav" style={style}  iconStyle={{ fill: 'grey' }} aria-label="Delete">
                      <DeleteIcon />
                      </IconButton>
                      </MuiThemeProvider>
                      </td>
                      <td >
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    );

  }
}

export default Favourites;
