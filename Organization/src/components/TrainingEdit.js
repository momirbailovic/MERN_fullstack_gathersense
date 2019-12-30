import React, {Component} from 'react';
import {
    Card, 
    CardContent,
    Avatar,
    Divider,
    TextareaAutosize ,
    Fab,
    Dialog,
    Slide,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';

import {
    Form,
    Button,
    Alert,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { connect } from 'react-redux'
import { 
    addQuestion,
    delQuestion,
    editQuestion,
    addSession,
    editionSession,
} from '../actions';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import '../assets/css/Tranining.css';
import '../assets/css/bodypanel.css';

const SortableItem = sortableElement(({number, value, onQuestionEdit, onQuestionDel}) => 
    <Card className="editcard">
        <CardContent>
            <div className="betweendiv">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {
                        value.title === undefined ? (
                            <div>
                                <label style={{paddingLeft: 10, margin: 0, fontSize: 16, fontWeight: 'bold'}}>{ 'Question ' + (number + 1) } </label>                            
                                <label style={{paddingLeft: 10, margin: 0, fontSize: 14}}>{value.question}</label>
                            </div>
                        ) : ( 
                            <div>
                                <label style={{paddingLeft: 10, margin: 0, fontSize: 16, fontWeight: 'bold'}}>{ 'Title ' + (number + 1) } </label>                             
                                <label style={{paddingLeft: 10, margin: 0, fontSize: 14}}>{value.title}</label>
                            </div>
                        )
                    }
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div onClick={()=>onQuestionEdit(value.id)} >
                        <svg style={{margin: 10, cursor: 'pointer'}} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.4374 0C15.0921 0 15.7197 0.26142 16.1781 0.723423L19.279 3.82432C19.7407 4.286 20.0001 4.91217 20.0001 5.56508C20.0001 6.21799 19.7407 6.84416 19.279 7.30584L7.95751 18.6238C7.25902 19.4295 6.2689 19.9245 5.1346 20.0023H0V19.0023L0.00324765 14.7873C0.0884382 13.7328 0.578667 12.7523 1.3265 12.0934L12.6954 0.724628C13.1564 0.26083 13.7834 0 14.4374 0ZM5.06398 18.0048C5.59821 17.967 6.09549 17.7184 6.49479 17.2616L14.0567 9.69972L10.3023 5.94519L2.6961 13.5496C2.29095 13.9079 2.04031 14.4092 2 14.8678V18.0029L5.06398 18.0048ZM11.7167 4.53115L15.4709 8.2855L17.8648 5.89162C17.9514 5.80502 18.0001 5.68756 18.0001 5.56508C18.0001 5.4426 17.9514 5.32514 17.8648 5.23854L14.7611 2.13486C14.6755 2.04855 14.5589 2 14.4374 2C14.3158 2 14.1992 2.04855 14.1136 2.13486L11.7167 4.53115Z" fill="#FF475B"/>
                        </svg>
                    </div>
                    <div onClick={()=>onQuestionDel(value.id)} >
                        <svg style={{margin: 10, cursor: 'pointer'}} width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.30171 0H20.3017C21.4063 0 22.3017 0.89543 22.3017 2V14C22.3017 15.1046 21.4063 16 20.3017 16H7.30171C6.7965 16 6.56859 15.8135 6.10516 15.3177C6.05883 15.2681 6.01163 15.216 5.96363 15.1616C5.77978 14.9533 5.61592 14.7494 5.53349 14.6402L0 8L0.533487 7.35982L5.48348 1.42511C5.58756 1.27697 5.74534 1.0672 5.92873 0.851777C6.00195 0.765768 6.07423 0.685229 6.14572 0.610795C6.53134 0.209291 6.81743 0 7.30171 0ZM7.45179 2.14822C7.31595 2.3078 7.19167 2.47303 7.07009 2.64018L2.60352 8.00007L7.09623 13.3926C7.17883 13.5006 7.31644 13.6717 7.46347 13.8384C7.49933 13.879 7.53381 13.9171 7.56648 13.952C7.58231 13.969 7.59755 13.985 7.61208 14H20.3019V2H7.58468C7.54385 2.0427 7.4991 2.09265 7.45179 2.14822ZM15.5938 4.29297L13.3009 6.58586L11.008 4.29297L9.59375 5.70718L11.8866 8.00008L9.59375 10.293L11.008 11.7072L13.3009 9.41429L15.5938 11.7072L17.008 10.293L14.7151 8.00008L17.008 5.70718L15.5938 4.29297Z" fill="#FF475B"/>
                        </svg>
                    </div>
                    <svg style={{margin: 10}} width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M20 2V0H0V2H20ZM20 6V8H0V6H20ZM20 12V14H0V12H20Z" fill="#979797"/>
                    </svg>
                </div>                                    
            </div>
        </CardContent>
    </Card>
);
const SortableItemSQ = sortableElement(({number, value, changeValu}) => 
    <Form.Row className="formgroupO" style={{paddingLeft: 5, paddingRight: 5, display: 'flex'}} key={number}>
        <Form.Group controlId="formGridOption1" className="formgrouptxt90" >
            <Form.Control placeholder={'Option' + (number + 1) } className="inputtxt" value={value} onChange={(event) => changeValu(event, number)}/>
        </Form.Group>
        <Form.Group controlId="formGridState" className="formgroupch10">
            <div style={{display: 'flex', marginTop: 8}}>
                <svg width="24" height="18" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.1252 2V0H0.25V2H20.1252ZM20.1252 6V8H0.25V6H20.1252ZM20.1252 12V14H0.25V12H20.1252Z" fill="#979797"/>
                </svg>
            </div>
        </Form.Group>
    </Form.Row>
);

const SortableContainer = sortableContainer(({children}) => {
    return <ul style={{padding: 0}} key={0}>{children}</ul>;
  });

const SortableContainerSQ = sortableContainer(({children}) => {
  return <ul style={{padding: 0}} key={1}>{children}</ul>;
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class TrainingEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NEFlag: this.props.NEFlag,
            optionsMC: ['', ],
            optionsMCChk: [ false, ],
            sessionTitle: this.props.sessionTitle,
            description: this.props.sessionDescription,
            questionlist: this.props.questionList,            
            showflag: '0', //category
            question: '',
            title: '',
            options: [],
            feedback: '',
            selected: [], // tags
            text: '',
            file: null,
            video: '',

            questionId: [],
            errorShow: false,

            editFlag: false,
            editId: '',
                        
            delopen: false,
            only6show: false,

        }
        this.onShowFlag = this.onShowFlag.bind(this)
    }

    onShowFlag = (event) => {
        this.setState({
            showflag: event.target.value,
        })
        this.onQuizVariClear();
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({questionlist}) => ({
            questionlist: arrayMove(questionlist, oldIndex, newIndex),
        }));
    };

    onSortEndSQ = ({oldIndex, newIndex}) => {
        this.setState(({optionsMC, optionsMCChk}) => ({
            optionsMC: arrayMove(optionsMC, oldIndex, newIndex),
            optionsMCChk: arrayMove(optionsMCChk, oldIndex, newIndex),
        }));
    };

    addOptionMC = () => {
        var optionsMC = this.state.optionsMC;
        var optionsMCChk = this.state.optionsMCChk;
        var cnt = optionsMC.length + 1;
        if (cnt > 6){
            this.setState({
                only6show: true,
            })
            return;
        } 
        optionsMC.push('');
        optionsMCChk.push(false);
        this.setState({optionsMC: optionsMC, optionsMCChk: optionsMCChk});
    }

    onChangeTxtMC(e, index) {
        var optionsMC = this.state.optionsMC;
        optionsMC[index] = e.target.value;
        this.setState({optionsMC: optionsMC});
    }

    onChangeCheckMC(index) {        
        var optionsMCChk = this.state.optionsMCChk;
        if (this.state.showflag === '0'){
            for(var i = 0; i < optionsMCChk.length; i ++){
                if (i === index)
                    optionsMCChk[i] = true;
                else
                    optionsMCChk[i] = false;
            }
            this.setState({optionsMCChk: optionsMCChk});
            return ;
        }
        var option = optionsMCChk[index];
        optionsMCChk[index] =  !option;
        this.setState({optionsMCChk: optionsMCChk});
    }

    changeValu = (event, number) => {
        var optionsMC = this.state.optionsMC;
        optionsMC[number] = event.target.value;
        this.setState({optionsMC: optionsMC});        
    }

    onChangeFile = (e) => {
        if (e.target.files[0] !== undefined)
            this.setState({file:e.target.files[0]});
        else
            this.setState({file: null});
    }

    onAddQuestion = () => {
        if (this.state.showflag === '3'){
            if (            
                this.state.title === '' ||
                this.state.text === '' 
            ) {this.setState({errorshow: true});return;}
        }
        else {
            if (
            this.state.question === ''||
            this.state.optionsMC[0] === '' ||
            this.state.feedback === '' ||
            this.state.selected === []
            ){ this.setState({errorshow: true});return;}
        } 
        
        const formData = new FormData();
        formData.append("category", Number(this.state.showflag));
        if (this.state.showflag === '3'){
            formData.append("title",this.state.title);
            formData.append("text",this.state.text);
            if (this.state.file !== null)
                formData.append("image",this.state.file);
            if (this.state.video !== '')
                formData.append("video",this.state.video);
        }
        else {
            formData.append("question",this.state.question);
            var option = '';
            var correct_answer = [];
            for(var j = 0; j < this.state.optionsMC.length; j++){
                if ((j + 1) !== this.state.optionsMC.length )
                    option = option + (this.state.optionsMC[j]) + '|';
                else
                    option = option + (this.state.optionsMC[j]);
                if (this.state.showflag === '1')
                    correct_answer.push(j);
                else if (this.state.optionsMCChk[j])
                    correct_answer.push(j);
            }
            formData.append("options",option);
            formData.append("correct_answer",correct_answer);
            formData.append("feedback",this.state.feedback);
            var tags = [];
            for(j = 0; j < this.props.tags.length; j++){
                for (var k = 0; k < this.state.selected.length; k++){                        
                    if (this.state.selected[k] === this.props.tags[j])
                        tags.push(j);
                }
            }
            formData.append("tags", tags);
        }
        if (this.state.editFlag){
            formData.append("id", this.state.editId);
            this.props.editQuestion(formData, this.callbackQuizEdit);
        }
        else
            this.props.addQuestion(formData, this.callbackQuizAdd);
    }

    callbackQuizAdd = (question) => {
        var questionlist = this.state.questionlist;
        questionlist.push(question);
        this.setState({questionlist: questionlist});
        this.onQuizVariClear();
    }

    callbackQuizEdit = (question) => {
        var questionlist = this.state.questionlist;
        for (var i = 0; i < questionlist.length; i++){
            if (questionlist[i].id === question.id){
                questionlist.splice(i, 1);
                questionlist.splice(i, 0, question);
            }
        }
        this.setState({questionlist: questionlist});
        this.onQuizVariClear();
    }

    onQuestionEdit = (id) => {
        var index = -1;
        var questionlist = this.state.questionlist;
        for (var i = 0; i <  questionlist.length; i++){
            if (questionlist[i].id === id){
                index = i;
                break;
            }
        }
        if (index === -1)
            return;
        
        if (questionlist[index].category === 3){
            this.setState({
                showflag: '3',
                title: questionlist[index].title,
                text: questionlist[index].text,
                file: null,
                video: questionlist[index].video,
                errorshow: false,
                editFlag: true,
                editId: id,
            })
        }
        else {
            var optionsMCChk = [];
            for ( i = 0; i < questionlist[index].options.length; i++){
                if (questionlist[index].correct_answer.includes(i))
                    optionsMCChk.push(true);
                else
                    optionsMCChk.push(false);
            }
            var tags = [];
            for ( i = 0; i < this.props.tags.length; i++){
                if (questionlist[index].tags.includes(i))
                    tags.push(this.props.tags[i]);
            }
            this.setState({
                editFlag: true,
                editId: id,
                showflag: String(questionlist[index].category),
                question: questionlist[index].question,
                feedback: questionlist[index].feedback,
                optionsMC: questionlist[index].options,
                optionsMCChk: optionsMCChk,
                selected: tags,
                errorshow: false,
            })
        }
    }    

    onQuestionDel = (id) => {
        this.setState({
            editId: id,        
            delopen: true,
        })
        
        //this.props.delQuestion(id, this.callbackQuizDel);
    }
    onQuizDelete = () => {
        this.props.delQuestion(this.state.editId, this.callbackQuizDel);
    }
    callbackQuizDel = (id) => {
        var index;
        var questionlist = this.state.questionlist;
        for (var i = 0; i <  questionlist.length; i++){
            if (questionlist[i].id === id){
                index = i;
                break;
            }
        }
        questionlist.splice(index, 1);
        this.setState({questionlist: questionlist});
        this.onQuizVariClear();
    }

    onQuizVariClear = () => {
        this.setState({
            question: '',
            optionsMC: ['',],
            optionsMCChk: [false,],
            feedback: '',
            selected: [],
            text: '',
            file: null,
            video: '',
            errorshow: false,
            title: '',
            editFlag: false,
            editId: '',
            delopen: false,
            only6show: false,
        });
    }

    onCreateSession = () => {
        
        if (this.state.sessionTitle === '' || this.state.description === ''){
            this.setState({errorshow: true});
            return;
        }

        var questionId = [];
        var tags = [];
        for (var i = 0; i < this.state.questionlist.length; i++) {
            questionId.push(this.state.questionlist[i].id);
            if (this.state.questionlist[i].category !== 3){
                for (var j = 0; j < this.state.questionlist[i].tags.length; j++){
                    if (!tags.includes(this.state.questionlist[i].tags[j]))
                        tags.push(this.state.questionlist[i].tags[j])
                }
            }
        }
        if (this.props.NEFlag === 0){
            var data = {
                title: this.state.sessionTitle,
                description: this.state.description,
                questions: questionId,
                tags:tags,
            };
            this.props.addSession(data, this.callbackSession);
        }
        else
        {
            data = {
                id: this.props.sessionId,
                title: this.state.sessionTitle,
                description: this.state.description,
                questions: questionId,
                tags: tags,
            };
            this.props.editionSession(data, this.callbackSession);
        }

    }

    callbackSession = (sessionData) => {
        this.setState({
            errorshow: false,
            sessionTitle: '',
            description: '',
            questionList: [],
        });

        this.props.createNew(sessionData);
    }
  
    render() {
        return (
            <div className="container" >
                <Card className="editcard">
                    <CardContent> 
                        <Form> 
                            {this.state.errorshow && (
                                <Alert  variant="danger" style={{width: '95%', margin: '10px'}} >
                                    Input information correctly!
                                </Alert>
                            )}                         
                            <Form.Group controlId="formGridSessionTitle" className="formgroup" >
                                <Form.Control placeholder="SessionTitle" className="inputtxt" value={this.state.sessionTitle} onChange={(event)=> this.setState({sessionTitle: event.target.value})}/>
                            </Form.Group>
                            <Form.Group controlId="formGridDescription" className="formgroup">
                                <Form.Control placeholder="Description" className="inputtxt" value={this.state.description} onChange={(event)=> this.setState({description: event.target.value})} />
                            </Form.Group>
                            <Divider style={{margin: 20}}/>
                            <Form.Row className="formgroupO" style={{paddingLeft: 5, paddingRight: 5}} >
                                <Form.Group controlId="formGridQuestion" className="formgrouptxt" >
                                    {/* <Form.Label>Address</Form.Label> */}
                                    {
                                        this.state.showflag === '3' ? (
                                            <Form.Control placeholder="Title" className="inputtxt" value={this.state.title} onChange={(event)=> this.setState({title: event.target.value})} />
                                        ) : (
                                            <Form.Control placeholder="Question" className="inputtxt" value={this.state.question} onChange={(event)=> this.setState({question: event.target.value})} />
                                        )
                                    }
                                    
                                </Form.Group>
                                <Form.Group controlId="formGridState" className="formgroupch">
                                    <Form.Control as="select" className="inputtxt"
                                        onChange={this.onShowFlag} 
                                    >
                                        {this.state.showflag === '0' ? <option value='0' >Multiple Choice</option> : <option value='0' >Multiple Choice</option>}
                                        {this.state.showflag === '3' ? <option value='3' selected>Plain Text, Image, Video</option>: <option value='3' >Plain Text, Image, Video</option>}
                                        {this.state.showflag === '1' ? <option value='1' selected>Sequence</option>: <option value='1' >Sequence</option>}
                                        {this.state.showflag === '2' ? <option value='2' selected>Selection</option>: <option value='2' >Selection</option>}
                                       
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>                                 
                            <div style={this.state.showflag === "0" ? {display: 'block'} : {display: 'none'}}>                                
                                <Typeahead
                                    {...this.state}
                                    id="basic-example"
                                    multiple={true}
                                    onChange={selected => this.setState({ selected })}
                                    options={this.props.tags}
                                    placeholder="Select Tags"
                                    className="typeheadset"
                                />
                                {this.state.optionsMC.map((item, index) => (
                                    <Form.Row className="formgroupO" style={{paddingLeft: 5, paddingRight: 5}} key={index}>
                                        <Form.Group controlId="formGridOption1" className="formgrouptxt" >
                                            <Form.Control placeholder={'Option' + (index + 1)} className="inputtxt" value={item} onChange={(e) => this.onChangeTxtMC(e, index)}/>
                                        </Form.Group>
                                        <Form.Group controlId="formGridState" className="formgroupch">
                                            {this.state.optionsMCChk[index] === false ? (
                                                <div >
                                                    <svg onClick={() => this.onChangeCheckMC(index)} style={{cursor: 'pointer'}} width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="16.5" cy="16.5" r="16.5" fill="#F2F2F2"/>
                                                    </svg>
                                                    <label style={{paddingLeft: 10, color: '#979797'}}>Mark as correct option</label>
                                                </div>
                                            ) : (
                                                <div style={{display: 'flex'}}>
                                                    <Avatar onClick={() => this.onChangeCheckMC(index)} style={{backgroundColor: '#FF475B', width: 32, height: 32, cursor: 'pointer' }}>
                                                        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.70711 9.29289L15 0L16.4142 1.41421L5.70711 12.1213L0 6.41421L1.41421 5L5.70711 9.29289Z" fill="white"/>
                                                        </svg>
                                                    </Avatar>
                                                    <label style={{paddingLeft: 11, color: '#979797', marginTop: 3}}>Mark as correct option</label>
                                                </div>
                                            )
                                        }
                                        </Form.Group>
                                    </Form.Row>
                                ))}
                                <Form.Group controlId="formGridAnswerfeedback" className="formgroup" >
                                    <Form.Control placeholder="Answer feedback" className="inputtxt" value={this.state.feedback} onChange={(event)=> this.setState({feedback: event.target.value})} />
                                </Form.Group>        
                                {this.state.only6show && (
                                    <Alert  variant="danger" style={{width: '95%', margin: '10px'}} >
                                        You can only add 6 option fields!
                                    </Alert>
                                )}
                                <div className="betweendiv">
                                       
                            
                                    <div onClick={this.addOptionMC} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM12 7H9V4H7V7H4V9H7V12H9V9H12V7Z" fill="#FF475B"/>
                                        </svg>
                                        <label style={{color: '#FF475B', paddingLeft: 10, margin: 0, cursor: 'pointer'}}> Add another option </label>
                                    </div>
                                    {
                                        !this.state.editFlag ? (
                                            <Button className="updatebnt" onClick={this.onAddQuestion} >
                                                Add Question
                                            </Button> 
                                        ) : (
                                            <Button className="updatebnt" onClick={this.onAddQuestion} >
                                                Edit Question
                                            </Button> 
                                        )
                                    }                                    
                                </div>
                            </div>
                            <div style={this.state.showflag === "3" ? {display: 'block'} : {display: 'none'}}>
                                
                                <Form.Group controlId="formGridEmail" className="formgroup" style={{display: 'flex', backgroundColor: '#F2F2F2', padding: 0, margin: 10, borderRadius: 10}}>
                                    <Card className="toggleCard" style={{backgroundColor: '#f2f2f2'}}>                                        
                                        <TextareaAutosize
                                            rowsMax={4}
                                            aria-label="maximum height"
                                            placeholder="Input Data"
                                            // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            //     ut labore et dolore magna aliqua."
                                            style={{height: '100px', fontWeight: 'italic', fontstyle:'italic'}}
                                            className="toggletxt"
                                            value={this.state.text} onChange={(event)=> this.setState({text: event.target.value})}
                                        />
                                    </Card>
                                </Form.Group>
                                <Form.Row className="formgroupO" style={{paddingLeft: 5, paddingRight: 5}} >
                                    <Form.Group controlId="formGridOption1" className="formgrouphalf" >
                                        {
                                            this.state.video === '' ? (
                                                <div  style={{display: 'flex', alignItems: 'center'}}>
                                                    <input
                                                        accept="image/*"
                                                        ref="file"
                                                        style={{display: 'none'}}
                                                        id="outlined-button-file1"
                                                        multiple
                                                        type="file"
                                                        onChange={this.onChangeFile}
                                                    />
                                                    {this.state.file === null ? (
                                                        <label htmlFor="outlined-button-file1">
                                                            <Fab variant="round" component="span" aria-label="add" style={{color: '#F2F2F2'}}>
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z" fill="#979797"/>
                                                                </svg>
                                                            </Fab>
                                                        </label>
                                                    ) : (
                                                        <label htmlFor="outlined-button-file1">
                                                            <Avatar alt="Remy Sharp" src={URL.createObjectURL(this.state.file)} style={{width: 55, height: 55, border: '2px solid #fff'}} />
                                                            {/* <img src={URL.createObjectURL(this.state.file)} className="img" alt="sfdsdfsdfdsf"/> */}
                                                        </label>
                                                    )}
                                                    {this.state.file === null ? (
                                                        <Form.Control placeholder="Upload Image (Optional)" className="inputtxt" disabled={true} style={{marginLeft: 25}}/>
                                                    ):(
                                                        <Form.Control placeholder={URL.createObjectURL(this.state.file)} className="inputtxt" disabled={true} style={{marginLeft: 25}}/>
                                                    )}
                                                </div>                                       
                                            ) : (
                                                <div disabled style={{display: 'flex', alignItems: 'center'}}>
                                                    <input
                                                        accept="image/*"
                                                        ref="file"
                                                        style={{display: 'none'}}
                                                        id="outlined-button-file1"
                                                        multiple
                                                        type="file"
                                                        onChange={this.onChangeFile}
                                                        disabled={true} 
                                                    />
                                                    {this.state.file === null ? (
                                                        <label htmlFor="outlined-button-file1">
                                                            <Fab variant="round" component="span" aria-label="add" style={{color: '#F2F2F2'}}>
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 9H20V11H11V20H9V11H0V9H9V0H11V9Z" fill="#979797"/>
                                                                </svg>
                                                            </Fab>
                                                        </label>
                                                    ) : (
                                                        <label htmlFor="outlined-button-file1">
                                                            <Avatar alt="Remy Sharp" src={URL.createObjectURL(this.state.file)} style={{width: 55, height: 55, border: '2px solid #fff'}} />
                                                            {/* <img src={URL.createObjectURL(this.state.file)} className="img" alt="sfdsdfsdfdsf"/> */}
                                                        </label>
                                                    )}
                                                    {this.state.file === null ? (
                                                        <Form.Control placeholder="Upload Image (Optional)" className="inputtxt" disabled={true} style={{marginLeft: 25}}/>
                                                    ):(
                                                        <Form.Control placeholder={URL.createObjectURL(this.state.file)} className="inputtxt" disabled={true} style={{marginLeft: 25}}/>
                                                    )}
                                                </div>                                                
                                            )     
                                        }
                                    
                                    </Form.Group>
                                    <Form.Group controlId="formGridOption1" className="formgrouphalf" >
                                        {
                                            this.state.file === null ? (
                                                <Form.Control placeholder="Embed YouTube Video (Optional)" className="inputtxt" style={{marginTop: 13}}value={this.state.video} onChange={(event)=> this.setState({video: event.target.value})}/>
                                            ) : (
                                                <Form.Control placeholder="Embed YouTube Video (Optional)" disabled className="inputtxt" style={{marginTop: 13}}value={this.state.video} onChange={(event)=> this.setState({video: event.target.value})}/>
                                            )
                                        }
                                        
                                    </Form.Group>
                                </Form.Row>
                                {this.state.only6show && (
                                    <Alert  variant="danger" style={{width: '95%', margin: '10px'}} >
                                        You can only add 6 option fields!
                                    </Alert>
                                )}
                                <div className="betweendiv">
                                    <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer', visibility: 'hidden'}}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM12 7H9V4H7V7H4V9H7V12H9V9H12V7Z" fill="#FF475B"/>
                                        </svg>
                                        <label style={{color: '#FF475B', paddingLeft: 10, margin: 0, cursor: 'pointer'}}> Add another option </label>
                                    </div>
                                    {
                                        !this.state.editFlag ? (
                                            <Button className="updatebnt" onClick={this.onAddQuestion} >
                                                Add Question
                                            </Button> 
                                        ) : (
                                            <Button className="updatebnt" onClick={this.onAddQuestion} >
                                                Edit Question
                                            </Button> 
                                        )
                                    }                                    
                                </div> 
                            </div>                                                 
                            <div style={this.state.showflag === "1" ? {display: 'block'} : {display: 'none'}}> 
                                 
                                <Typeahead
                                    {...this.state}
                                    id="basic-example"
                                    multiple={true}
                                    onChange={selected => this.setState({ selected })}
                                    options={this.props.tags}
                                    placeholder="Select Tags"
                                    className="typeheadset"
                                />
                                <div >
                                    <SortableContainerSQ onSortEnd={this.onSortEndSQ}>
                                        {this.state.optionsMC.map((item, index) => (
                                            <SortableItemSQ key={`itemSQ-${index}`} index={index} value={item} number={index} changeValu={this.changeValu}/>
                                        ))}
                                    </SortableContainerSQ>
                                </div>
                                <Form.Group controlId="formGridAnswerfeedback" className="formgroup" >
                                    <Form.Control placeholder="Answer feedback" className="inputtxt" value={this.state.feedback} onChange={(event)=> this.setState({feedback: event.target.value})} />
                                </Form.Group>
                                {this.state.only6show && (
                                    <Alert  variant="danger" style={{width: '95%', margin: '10px'}} >
                                        You can only add 6 option fields!
                                    </Alert>
                                )}
                                <div className="betweendiv">
                                    <div onClick={this.addOptionMC} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM12 7H9V4H7V7H4V9H7V12H9V9H12V7Z" fill="#FF475B"/>
                                        </svg>
                                        <label style={{color: '#FF475B', paddingLeft: 10, margin: 0, cursor: 'pointer'}}> Add another option </label>
                                    </div>
                                    {
                                        !this.state.editFlag ? (
                                            <Button className="updatebnt" onClick={this.onAddQuestion} >
                                                Add Question
                                            </Button> 
                                        ) : (
                                            <Button className="updatebnt" onClick={this.onAddQuestion} >
                                                Edit Question
                                            </Button> 
                                        )
                                    }                                   
                                </div>
                            </div>
                            <div style={this.state.showflag === "2" ? {display: 'block'} : {display: 'none'}}>
                                 
                                <Typeahead
                                    {...this.state}
                                    id="basic-example"
                                    multiple={true}
                                    onChange={selected => this.setState({ selected })}
                                    options={this.props.tags}
                                    placeholder="Select Tags"
                                    className="typeheadset"
                                />

                                {this.state.optionsMC.map((item, index) => (
                                    <Form.Row className="formgroupO" style={{paddingLeft: 5, paddingRight: 5}} key={index}>
                                        <Form.Group controlId="formGridOption1" className="formgrouptxt" >
                                            <Form.Control placeholder={'Option' + (index + 1)} className="inputtxt" value={item} onChange={(e) => this.onChangeTxtMC(e, index)}/>
                                        </Form.Group>
                                        <Form.Group controlId="formGridState" className="formgroupch">
                                            {this.state.optionsMCChk[index] === false ? (
                                                <div >
                                                    <svg onClick={() => this.onChangeCheckMC(index)} style={{cursor: 'pointer'}} width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="16.5" cy="16.5" r="16.5" fill="#F2F2F2"/>
                                                    </svg>
                                                    <label style={{paddingLeft: 10, color: '#979797'}}>Mark as correct option</label>
                                                </div>
                                            ) : (
                                                <div style={{display: 'flex'}}>
                                                    <Avatar onClick={() => this.onChangeCheckMC(index)} style={{backgroundColor: '#FF475B', width: 32, height: 32, cursor: 'pointer' }}>
                                                        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.70711 9.29289L15 0L16.4142 1.41421L5.70711 12.1213L0 6.41421L1.41421 5L5.70711 9.29289Z" fill="white"/>
                                                        </svg>
                                                    </Avatar>
                                                    <label style={{paddingLeft: 11, color: '#979797', marginTop: 3}}>Mark as correct option</label>
                                                </div>
                                            )
                                        }
                                        </Form.Group>
                                    </Form.Row>
                                ))}
                                <Form.Group controlId="formGridAnswerfeedback" className="formgroup" >
                                    <Form.Control placeholder="Answer feedback" className="inputtxt" value={this.state.feedback} onChange={(event)=> this.setState({feedback: event.target.value})} />
                                </Form.Group>
                                {this.state.only6show && (
                                    <Alert  variant="danger" style={{width: '95%', margin: '10px'}} >
                                        You can only add 6 option fields!
                                    </Alert>
                                )}
                                <div className="betweendiv">
                                    <div onClick={this.addOptionMC} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM12 7H9V4H7V7H4V9H7V12H9V9H12V7Z" fill="#FF475B"/>
                                        </svg>
                                        <label style={{color: '#FF475B', paddingLeft: 10, margin: 0, cursor: 'pointer'}}> Add another option </label>
                                    </div>
                                    {
                                        !this.state.editFlag ? (
                                            <Button className="updatebnt" onClick={this.onAddQuestion} >
                                                Add Question
                                            </Button> 
                                        ) : (
                                            <Button className="updatebnt" onClick={this.onAddQuestion} >
                                                Edit Question
                                            </Button> 
                                        )
                                    }
                                                                       
                                </div>
                            </div>
                        </Form>
                    </CardContent>
                </Card>
                <div >
                    <SortableContainer onSortEnd={this.onSortEnd} distance={1} >
                        {this.state.questionlist.map((item, index) => (
                            <SortableItem key={`itemQL-${item.id}`} index={index} value={item} number={index} onQuestionEdit={this.onQuestionEdit} onQuestionDel={this.onQuestionDel} />
                        ))}
                    </SortableContainer>
                </div>
                <Card className="editcard">
                    <CardContent>
                        <div style={{display: 'inline', float:'right'}}>                                
                            {/* <Button type="submit" className="savdrbnt" style={{border: '2px solid #FF475B', color: '#FF475B'}}>
                                Save Draft
                            </Button>                                 */}
                            {
                                this.props.NEFlag === 0 ? (
                                    <Button className="cresebnt" onClick={this.onCreateSession}>
                                        Create Session
                                    </Button>
                                ) : (
                                    <Button className="cresebnt" onClick={this.onCreateSession}>
                                        Save Changes
                                    </Button>
                                )
                            }
                                                       
                        </div>
                    </CardContent>
                </Card>
                <Dialog
                        open={this.state.delopen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.onQuizVariClear}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title" className="deltitle" style={{margin: 'auto'}}>
                            Are you sure you want to delete?
                        </DialogTitle>
                        <DialogContent>
                        </DialogContent>
                        <DialogActions style={{margin: 'auto', padding: '0px 30px 30px'}}>
                            <Button onClick={this.onQuizDelete} style={{marginRight: '20px', borderRadius: '10px', color: '#fff', backgroundColor: '#FF475B', borderWidth: '0px'}}>
                                Yes
                            </Button>
                            <Button onClick={this.onQuizVariClear} style={{marginLeft: '20px', borderRadius: '10px', color: '#fff', backgroundColor: '#9AA9B7', borderWidth: '0px'}}>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
            </div>           
        );
    }
}

const mapDispatchToProps = {
    addQuestion: addQuestion,
    delQuestion: delQuestion,
    editQuestion: editQuestion,
    addSession: addSession,
    editionSession: editionSession,
}

const mapStateToProps = ({Train, Normal}) => {
    const {
        color,
        tags,
        sessionId,
        sessionTitle,
        sessionDescription,
        questionList,

    } = Train;
    const {
        getstate,
    } = Normal;
    return {
        color,
        tags,
        sessionId,
        sessionTitle,
        sessionDescription,
        questionList,
        getstate,
    }
};


TrainingEdit = connect(mapStateToProps, mapDispatchToProps)(TrainingEdit)
export default TrainingEdit;