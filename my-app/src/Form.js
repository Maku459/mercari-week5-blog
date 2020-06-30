import React from 'react';
import ReactDOM from 'react-dom';
import './Form.css';
import BlogListItem from './BlogListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  }));

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        if(!localStorage.getItem("blogList")){
            this.state = {blogList: []};
            localStorage.setItem("blogList", JSON.stringify(this.state.blogList));
        }else{
            this.state = {blogList: JSON.parse(localStorage.getItem("blogList"))}
        }
    }

    addblog = (item, callBack) => {
        this.setState(
          {
            blogList: this.state.blogList.concat(item)
          },
          () => {
            localStorage.setItem("blogList", JSON.stringify(this.state.blogList))
            callBack && callBack()
          }
        )
      }

    render() {
        const userList = JSON.parse(localStorage.getItem("userList"));
        //const classes = useStyles();
        const dateFull =new Date();

        const year = dateFull.getFullYear();
        const month = dateFull.getMonth()+1;
        const day = dateFull.getDate();
        const hour = dateFull.getHours();
        const minute = dateFull.getMinutes();
        
        const dateDisplay = `${year}/${month}/${day} ${hour}:${minute}`; 

        return (
            <div>
                <div className="form">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const titleElement = e.target.elements["titlefield"];
                            const blogElement = e.target.elements["outlined-full-width"];
                            const timeValue = dateDisplay;
                                this.addblog(
                                    {
                                        title: titleElement.value,
                                        blog: blogElement.value,
                                        date: timeValue,
                                        index: this.state.blogList.length
                                    },
                                    () => {
                                        titleElement.value = "";
                                        blogElement.value = "";
                                    }
                                )
                        }}
                    >
                        <div className="form-input">
                            <TextField
                                id="titlefield"
                                label="title"
                                style={{ margin: 8 }}
                                placeholder="title"
                                helperText=""
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-full-width"
                                label="blog"
                                style={{ margin: 8 }}
                                placeholder="Jot something down"
                                helperText=""
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                        </div>
                        <div className="form-button">
                            <Button
                                variant="contained"
                                type="submit"
                            >
                                Send
                            </Button>
                        </div>
                    </form>
                </div>
                {this.state.blogList.reverse().map(blogs => (
                    <BlogListItem
                        title={blogs.title}
                        blog={blogs.blog}
                        date={blogs.date}
                        index={blogs.index}
                    />
                ))}
            </div>
        );
    }
  }

export default Form;