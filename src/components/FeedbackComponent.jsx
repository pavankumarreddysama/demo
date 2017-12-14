import React, { Component } from 'react';
import '../assets/css/App.css';
import { Modal } from 'react-bootstrap';

class FeedbackComponent extends Component{
    constructor(props){
        super(props);
        this.state={          
            question1 : 'Customer',
            question2: '',
            question3: '',
            formValidation : true,
            showModal : true
        };
       this.handleOptionChange = this.handleOptionChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       this.close = this.close.bind(this);
    }
handleOptionChange (event) {
   this.setState({   
      question1: event.target.value,
      question2: event.target.value,
      question3: event.target.value
   });
}
close(){
  this.setState({
    showModal:false
  })
}
  handleSubmit = (event) =>{
    event.preventDefault();
  var answer1=event.target.question1.value,
      answer2=event.target.question2.value,
      answer3=event.target.question3.value;
      if(answer1 !=='' && answer2 !=='' && answer3 !==''){
        const question1 =event.target.question1[0].getAttribute('data-question'),
        question2 =  event.target.question2.getAttribute('data-question'),
        question3 = event.target.question3[0].getAttribute('data-question');
        var data = {};
      
        data[question1] = answer1;
        data[question2] = answer2;
        data[question3] = answer3;
        console.log(data);
        fetch("http://192.168.1.222:3005/feedback", {
           mode: 'cors',
           method : 'post',
           headers : {
            'Accept': 'application/json, text/plain, */*',
            'access-control-allow-origin': '*',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
        }).then( (result) =>{
          if(result.status === 200){
            alert('Feedback submitted'); 
            this.props.history.push('/');
          }
        }).catch((error) =>{
          alert('Service unavailable');
          console.log(error);
          this.props.history.push('/');
        });
      }else{
        console.log('show error');
        this.setState({
          formValidation : false
        });
      }
  }
  render(){
        var question1 = "Which one of the following best describes your relationship to ABC?";
        var question2= "What is the most important reason for your rating? Please be as detailed as possible.";
        var question3 = "Please rate your overall experience with abc.com.";
    return (
        <Modal show={this.state.showModal} onHide={this.close}>
           <Modal.Header closeButton>
                <Modal.Title>
                      Feedback form 
                </Modal.Title>
           </Modal.Header>
          <Modal.Body>
          <div className="feedback-form-area">

          <div className="form-group">  
            <div className="i1">
                HELP US TO IMPROVE
            </div>
            <div className="i2">
                Please share your feedback. Your opinion can help guide us to new and better ways to deliver the best tools and	experiences? 
            </div>
          </div>
             <form onSubmit={this.handleSubmit}  >
             
             <p className="feedback-form-error" hidden={this.state.formValidation}>Please fill all the fields </p>
             
             {/* <div className="feedbackErrorMessages" hidden="true">
					       	Please fill all the fields </div> */}

             <div className="form-group"> 
                    <div>
                       <p className="questions">{question1}</p>
                    </div>
            </div>
            <div className="form-group">
                    <div className="options">
                        <p>  <input type="radio"  data-question={question1} onChange={this.handleOptionChange}  name="question1" value="Customer" /> Customer</p>
                        <p><input type="radio" data-question={question1}  onChange={this.handleOptionChange}  name="question1" value="Employee"/> Employee</p>
                        <p><input type="radio" data-question={question1} onChange={this.handleOptionChange}  name="question1" value="Other"/> Other</p> 
                    </div>
             </div>
             <div className="form-group"> 
                <p className="questions">{question2}</p>
             </div>
             <div className="form-group">
                <div className="answer-text-area">
                      <textarea name="question2" data-question={question2} onChange={this.handleOptionChange}></textarea>
                </div>
             </div>
             <div className="form-group"> 
                <p className="questions">{question3}</p>
             </div>
            <div className="form-group"> 
                <div className="options">
                  <p><input type="radio" data-question={question3} name="question3" value="Satisfied"/> Satisfied</p>
                  <p><input type="radio" data-question={question3} name="question3" value="Dissatisfied"/> Dissatisfied</p>
                  <p><input type="radio"  data-question={question3} name="question3" value="Neither Satisfied Nor Dissatisfied"/> Neither Satisfied Nor Dissatisfied</p>
                </div>
             </div>
             <div className="form-group">
                <p> <button className="btn btn-primary" type="submit">Submit</button></p>
             </div>
            </form>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
          </Modal.Footer> */}
        </Modal>
      );
   }
}
export default FeedbackComponent;