import { useState } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const baseurl = 'http://localhost:3001/players';
  const [result, setResult] = useState(null);
  const [data, setData] = useState({
    name: " ",
    height: "",
    age: "",
    budget: "",
    handleShape: "",
    weightPreference: " ",
    battingStyle: "",
    playingLevel: "",
    battingApproach: "",
    strength: "",
    battingweakness: ""
  })

  const handlechange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  const savechange = (event) => {
    event.preventDefault();
    const newcricketer = data;
    axios.post(baseurl, newcricketer)
      .then(result => {
        console.log(result.data);
        setResult(result.data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="container">
      <div className="hero">
        < h1 > Batfit Predictor</h1 >
        <br></br>
        <br></br>
        <form onSubmit={savechange}>

          <label>Name</label>
          <input
            name="name"
            value={data.name}
            onChange={handlechange}
          />

          <br /><br />

          <label>Height (in cm)</label>
          <input
            name="height"
            value={data.height}
            onChange={handlechange}
          />

          <br /><br />


          <label>Age</label>
          <input
            name="age"
            value={data.age}
            onChange={handlechange}
          />

          <br /><br />

          <label>Budget(in pounds)</label>
          <input
            name="budget"
            value={data.budget}
            onChange={handlechange}
          />

          <br /><br />
          <label>Handle Shape</label>

          <select
            name="handleShape"
            value={data.handleShape}
            onChange={handlechange}
          >
            <option value="">Select Handle Shape</option>
            <option value="Oval">Oval</option>
            <option value="Semi Oval">Semi Oval</option>
            <option value="Round">Round</option>
          </select>
          <br /><br />
          <label>Bat Weight Preference</label>

          <select
            name="weightPreference"
            value={data.weightPreference}
            onChange={handlechange}
          >
            <option value="">Select Weight Preference</option>
            <option value="Light">Light Pickup</option>
            <option value="Medium">Medium Pickup</option>
            <option value="Heavy">Heavy Pickup</option>
          </select>
          <br /><br />

          <label>Batting Style</label>
          <select
            name="battingStyle"
            value={data.battingStyle}
            onChange={handlechange}
          >
            <option value="">Select Batting Style</option>
            <option value="Front Foot">Front Foot</option>
            <option value="Back Foot">Back Foot</option>
            <option value="Balanced">Balanced</option>
          </select>

          <br /><br />

          <label>Playing Level</label>
          <select
            name="playingLevel"
            value={data.playingLevel}
            onChange={handlechange}
          >
            <option value="">Select Playing Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Club">Club</option>
            <option value="Professional">Professional</option>
          </select>

          <br /><br />
          <label>Batting Approach</label>

          <select
            name="battingApproach"
            value={data.battingApproach}
            onChange={handlechange}
          >
            <option value="">Select Approach</option>
            <option value="Vertical Bat">Vertical Bat Player</option>
            <option value="Horizontal Bat">Horizontal Bat Player</option>
            <option value="Balanced">Balanced</option>
          </select>

          <br /><br />

          <label>Strength</label>
          <select
            name="strength"
            value={data.strength}
            onChange={handlechange}
          >
            <option value="">Select Strength</option>
            <option value="Timing">Timing</option>
            <option value="Power Hitting">Power Hitting</option>
            <option value="Footwork">Footwork</option>
            <option value="Defense">Defense</option>
            <option value="Shot Placement">Shot Placement</option>
          </select>

          <br /><br />

          <label>Batting Weakness</label>
          <select
            name="battingweakness"
            value={data.battingweakness}
            onChange={handlechange}
          >
            <option value="">Select Weakness</option>
            <option value="Short Ball">Short Ball</option>
            <option value="Spin">Spin</option>
            <option value="Swing">Swing</option>
            <option value="Yorkers">Yorkers</option>
            <option value="Footwork">Footwork</option>
          </select>
          <br></br>

          <button type="submit" className="submit-btn"> submit </button>
        </form>
      </div >
      <div className="result">
        <h1>{!result ? "Tell Your Specifications for your recommeded bat" : "the best bat according to your specifications"}</h1>
        {result && (
          <div>
            <h2>{result.batName}</h2>

            <p><strong>Brand:</strong> {result.brand}</p>

            <p><strong>Price:</strong> £{result.budget}</p>

            <p><strong>Weight:</strong> {result.weight}g</p>

            <p>{result.description}</p>
          </div>
        )}
      </div>

    </div >
  )
}

export default App;