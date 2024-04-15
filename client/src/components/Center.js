import react from 'react';
import {useState,useEffect} from 'react';

const Center = ()=>{
const[data,setData]  = useState('');

useEffect(()=>{
    const res  = fetch('https://localhost:9000/getAPI');
    setData(res);

})
    return(
        <>
        <div>
            {
                data.map((e)=>{
                    return(
                        <>
                        <h1>{e.name}</h1>
                        <h2>{e.fname}</h2>
                        <h3>{e.lname}</h3>
                        </>
                    )
                })
            }
        </div>
        
        <ArwesHeader animate>
    <Centered className={classes.root} {...rest}>
      <img src="/favicon.png" alt="" className={classes.img} style={{
        margin: "15px 10px 15px 0",
        height: "50px",
        width: "auto",
      }} />
      <Logo animate size={50} className={classes.logo} layer="header" />
      <Words animate className={classes.banner}>
        NASA Mission Control
      </Words>
      <nav className={`${classes.nav}`}>
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/launch">
              <i className="material-icons">check_circle_outline</i>Launch
            </Link>
          </Highlight>
        </Clickable>
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/upcoming">
            <i className="material-icons">update</i>Upcoming</Link>
          </Highlight>
        </Clickable>
        <Clickable className={classes.clickable} onClick={onNav}>
          <Highlight className={classes.button} animate layer="header">
            <Link className={classes.link} to="/history">
            <i className="material-icons">history</i>History</Link>
          </Highlight>
        </Clickable>
      </nav>
    </Centered>
  </ArwesHeader>
        
        
        </>
    )
}


export default Center;