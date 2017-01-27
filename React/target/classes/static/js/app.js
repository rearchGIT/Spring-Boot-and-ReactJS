/* START READING FROM THE BOTTOM */


////////////////////////////
//////// Person Row ////////
////////////////////////////


//This will represent a single row in the table
var Person = React.createClass({
	
// Initially we would like to show each of the given people
 getInitialState: function() {
   return {display: true, edit: false, firstName: this.props.person.firstName, lastName: this.props.person.lastName};
 },
  
// Listener for the firstName input field
 handleChangeFirstName(event) {
	  this.setState({firstName: event.target.value});
  },
  
//Listener for the lastName input field  
 handleChangeLastName(event) {
	  this.setState({lastName: event.target.value});
  },
  
  //If we click on cancel after any modification, we would like to reset the values to the original ones
  handleCancelEdit() {
	  this.setState({firstName: this.props.person.firstName, lastName: this.props.person.lastName});
	  this.setState({edit: !this.state.edit});
  },
  
  //If we click on edit, after the actual modification, we need to save the values.
  handleEdit() {
	  this.setState({edit: !this.state.edit});
  },
  
  //This will send the current state's relevant information to the server for an update
  handleRealEdit() {
	  var self = this;
	  $.ajax({
	        url: self.props.person._links.self.href,
	        type: 'PATCH',
	        contentType: 'application/json',
	        dataType : 'json',
	        data: JSON.stringify({ firstName: this.state.firstName, lastName: this.state.lastName }),
	        success: function(result) {
	          self.setState({edit: false});
	          toastr.success('Person has been updated', 'Information');
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	          toastr.error(xhr.responseJSON.message);
	        }
	   });
	  this.setState({edit: !this.state.edit});
  },
  
  
  // In case of the remove button is clicked, we don't show the person anymore
  handleDelete() {
	var self = this;
    $.ajax({
        url: self.props.person._links.self.href,
        type: 'DELETE',
        success: function(result) {
          self.setState({display: false});
          toastr.success('Person has been deleted', 'Information');
        },
        error: function(xhr, ajaxOptions, thrownError) {
          toastr.error(xhr.responseJSON.message);
        }
    });
  },
  
  // That's what we return to render - it will vary depending of the edit mode
  render: function() {
    //If deleted
	if (this.state.display==false) return null;
	//If clicked on edit
    if (this.state.edit == true){
    	return(
    	<tr>
        	<td><input type="text" value={this.state.firstName} onChange={this.handleChangeFirstName} ></input></td>
        	<td><input type="text" value={this.state.lastName} onChange={this.handleChangeLastName} ></input></td>
        	<td>
          	  <button className="btn btn-info glyphicon glyphicon-remove" onClick={this.handleCancelEdit}></button>  { "      " }
          	  <button className="btn btn-info glyphicon glyphicon-ok" onClick={this.handleRealEdit}></button>
          </td>
        </tr>
    	);
    } else return (
      <tr>
          <td>{this.state.firstName}</td>
          <td>{this.state.lastName}</td>
          <td>
          	<button className="btn btn-info glyphicon glyphicon-pencil" onClick={this.handleEdit}></button>  { "      " }
            <button className="btn btn-info glyphicon glyphicon-trash" onClick={this.handleDelete}></button>
          </td>
      </tr>
    );
  }
});

////////////////////////////
/////// People Table ///////
////////////////////////////

// PeopleTable is an element which will get all the people to render, it just
// needs to draw them
var PeopleTable = React.createClass({

  render: function() {

    var rows = [];
    // We go trough of each people and we make elements for each of them
    this.props.people.forEach(function(person) {
      rows.push(
        <Person person={person} key={person.id} />
      );
    });

    //This is what we return back as a view for the Application
    return (
      <table className="table table-striped text-center">
          <thead>
              <tr>
                  <th className="text-center">First Name</th>
                  <th className="text-center">Last Name</th>
                  <th className="text-center">Delete</th>
              </tr>
          </thead>
          <tbody>{rows}</tbody>
      </table>
    );
  }
});


// //////////////////////////
// Our actual Application //
////////////////////////////

var App = React.createClass({

  //Ajax using JQUERY
  loadPeopleFromServer: function() {
    var self = this;
    $.ajax({
        url: "http://localhost:8080/api/people",
      }).then(function(data) {
        self.setState({ people: data._embedded.people });
      });
  },
  
  // We define people
  getInitialState: function() {
    return { people: [] };
  },

  // When we call this element, we immediately will call the following
	// function
  componentDidMount: function() {
    this.loadPeopleFromServer();
    timeOut: 1000;
// toastr.success('People table is loaded', 'Information')
  },

  // That is what we return. This is called after "componentDidMount", so we
	// already have the ajax answer
  render() {
    return ( <PeopleTable people={this.state.people} /> );
  }
});
    

////////////////////////////
/// Connection with HTML ///
////////////////////////////
    
// This is where our application is set to a specific html element
ReactDOM.render(<App />, document.getElementById('root') );
