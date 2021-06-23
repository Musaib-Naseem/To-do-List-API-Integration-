import React,{useEffect,useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import  TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Axios from "axios";

import "./MainPage.css";

 const MainPage=()=>{



const [data,setData]=useState([]);
const [newFilterData,setNewFilterData]=useState([]);
const [allData,setAllData]=useState([]);
console.log(allData);
const [indivdualData,setIndivdualData]=useState("");
const [title,setTitle]=useState("");
const [keyey,setKeyey]=useState("");
const [searchItem,setSearchItem]=useState("");

console.log(searchItem);
console.log(indivdualData);
console.log(data);



 console.log(data);


const url="https://jsonplaceholder.typicode.com/todos";

function getUserDetails(){

var result = Axios.get(url)
.then((response)=>{

    const finalData=response.data;
    setData(finalData);
    setNewFilterData(finalData);
    


});

}


function showDetail(key,title){

  
  
  var userIndividual = Axios.get(`https://jsonplaceholder.typicode.com/users/${key}`)
.then((response)=>{
    setKeyey(key);
  setTitle(title);
    console.log(response.data);
    setIndivdualData(response.data);
    document.getElementById("userDetail").style.display="block";

    
    var allResult = Axios.get(url)
    .then((response)=>{
    
        const AllFinalData=response.data;
        
        console.log(AllFinalData);
       
       var filtdata=AllFinalData.filter(item=>item.userId===key);

       setAllData(filtdata);
    
    
    });





});



}

const handleChange=value=>{

  setSearchItem(value);
  filterData(value);


}


const filterData=(value)=>{

const lowerCaseValue=value.toLowerCase().trim();

if(lowerCaseValue == "" ){

  setData(newFilterData);
}

else{

  const filterData = data.filter(item =>{

    return Object.keys(item).some(key => {

      return item[key].toString().toLowerCase().includes(lowerCaseValue);
    })
  });

  setData(filterData);
}


}


useEffect(()=>{getUserDetails()},[]);


return(

    <>
 
      <CssBaseline />
      <Container maxWidth="lg" className="containerOne">
       <h1 className="containerHeading">React Coding Challenge</h1>
      </Container> 

      
       
      <Container maxWidth="lg" className="ContainerTwo">

      <Grid container>

      <Grid container xs={12} md={7} >

      <Grid item  xs={6}  >

      <h1 className="HeadingPad">Todos</h1>

      </Grid>

      <Grid item  xs={6}  >
        
      <form noValidate autoComplete="off">

      <TextField id="standard-basic" label="Search"  onChange={ e => handleChange(e.target.value)} />

      </form>

    
      </Grid>
     
     <h1 id="notFound"></h1>
     <TableContainer className="tableWidth">
     <Table>
     
     <TableHead>
   
     <TableRow>

     <TableCell>Todo&nbsp;Id</TableCell>
     <TableCell>Title</TableCell>
     <TableCell>Status</TableCell>
     <TableCell>Action</TableCell>

     </TableRow>


     </TableHead>




    <TableBody>

    { data.map((data,key)=>{
    
        key=data.userId;
        var title=data.title;
        
        var val;
        if(data.completed == false){
          val="Incomplete";

        }
        else{
        
            val="Complete";

        }
        return( 
            <TableRow >

              <TableCell align="left">{data.id}</TableCell>
              <TableCell align="left">{data.title}</TableCell>
              <TableCell align="left">{val}</TableCell>
              <TableCell align="left" id={key} onClick={()=>showDetail(key,title)}><Button variant="contained">View&nbsp;User</Button></TableCell>
              
           </TableRow>
        );
        })}
        
        <br /><br />
        {data.length === 0 && <span>No Records Found</span>}
    </TableBody>

     </Table>
     </TableContainer>
     
     
    
      
        
      
      </Grid>


      <Grid item  xs={12} md={5} style={{paddingTop:'22px', paddingBottom:'22px'}}>
      
      <h1 className="HeadingPad">User Detail</h1>
      
      <div id="userDetail" >
      <h4>{`Todo Id : ${keyey} `}</h4>
      <h4>{`Todo Title : ${title} `}</h4>
      
      <h4>{`User Id : ${indivdualData.id} `}</h4>
      <h4>{`Name : ${indivdualData.name} `}</h4>
      <h4>{`Email : ${indivdualData.email} `}</h4>
      </div>
      
     
      <TableContainer className="tableWidth">
     <Table>
     
     <TableHead>
   
     <TableRow>

     <TableCell>Todo&nbsp;Id</TableCell>
     <TableCell>Title</TableCell>
     <TableCell>Status</TableCell>
     

     </TableRow>


     </TableHead>




    <TableBody>

    { allData.map((data,key)=>{
    
      key=data.userId;
        
        var val;
        if(data.completed == false){
          val="Incomplete";

        }
        else{
        
            val="Complete";

        }
        return( 
            <TableRow >

              <TableCell align="left">{data.id}</TableCell>
              <TableCell align="left">{data.title}</TableCell>
              <TableCell align="left">{val}</TableCell>
              
              
           </TableRow>
        );
        })}
        
        
        
    </TableBody>

     </Table>
     </TableContainer>





      </Grid>

       
       
      </Grid>

      

      </Container>


      


    
    </>
)


}


export default MainPage;