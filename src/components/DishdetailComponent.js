import React,{Component} from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle,Breadcrumb,BreadcrumbItem,Modal,ModalBody,ModalHeader,Button,Row,Col,Label} from 'reactstrap';
import {Link}  from 'react-router-dom';
import {Control, LocalForm,Errors} from 'react-redux-form';
 
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props)
        this.state ={
            isModalOpen:false
        }
        this.toggleModal =this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       

    }

    toggleModal() {
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        console.log("Current state is:" + JSON.stringify(values));
        alert("Current state is:" + JSON.stringify(values));

    }

    render() {
 
        return(

            <React.Fragment>
                <Button outline onClick={this.toggleModal} >
                        <span className="fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            
                        <Row className="form-group">
                        <Col md={{size:12}}>
                            <div className="form-check">
                                <Label htmlFor="rating">
                                    Rating
                                </Label>
                            </div>
                        </Col>
                        <Col md={{size:12}}>
                            <Control.select model=".rating" name="rating" id="rating"
                                className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                         />
                                </Col>
                        </Row>
                        <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6"
                                            className="form-control" />
                                    </Col>
                        </Row>




                        <Button type="submit" value="submit" color="primary">Submit</Button>
                        
                        
                    </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );


    }
}
     function RenderComments({comments}) {
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                <CommentForm />
                
            </div>
        )
    } 

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    const Dishdetail =(props) => {
        if (props.dish == null) {
            return (<div></div>)
        }
        return (
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to= '/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
                </div>

                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}/>
                </div>
            </div>
        )
    }
    


export default Dishdetail 