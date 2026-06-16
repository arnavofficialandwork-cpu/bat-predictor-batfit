import { use, useState } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const baseurl = 'http://localhost:3001/players';
  const [result, setResult] = useState(null);
  const [playerData, setplayerData] = useState(null);
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
    setplayerData(data);

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

      {playerData && (
        <div className="profile-card">
          <h2>Your Batting Profile</h2>

          <p><strong>Budget:</strong> £{playerData.budget}</p>

          <p><strong>Playing Level:</strong> {playerData.playingLevel}</p>

          <p><strong>Batting Style:</strong> {playerData.battingStyle}</p>

          <p><strong>Batting Approach:</strong> {playerData.battingApproach}</p>

          <p><strong>Weight Preference:</strong> {playerData.weightPreference}</p>

          <p><strong>Weakness:</strong> {playerData.battingweakness}</p>
        </div>
      )}
      <div className="result">
        <h1>{!result ? "Tell Your Specifications for your recommeded bat" : "The best bat according to your specifications :"}</h1>
        {result && (
          <div className="results-container">
            {result && (
              <div className="results-container">
                {result.map((bat, index) => (
                  <div key={index} className="bat-card">

                    <h2>
                      {index === 0
                        ? " Best Match"
                        : `#${index + 1} Recommendation`}
                    </h2>

                    <h3>{bat.batName}</h3>

                    <h3>{bat.percentage} %</h3>

                    <p><strong>Brand:</strong> {bat.brand}</p>

                    <p><strong>Price:</strong> £{bat.budget}</p>

                    <p><strong>Weight:</strong> {bat.weight}g</p>

                    <p>{bat.description}</p>

                    <h4>Why this bat?</h4>

                    {bat.reasons?.map((reason, i) => (
                      <p key={i} className="reason">
                        {reason}
                      </p>
                    ))}

                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </div>
      <button
        className="download-btn"
        onClick={() => window.print()}
      >
        Download BatFit Report
      </button>
      {result && playerData && (
        <div className="report">

          <h1>BATFIT PLAYER ASSESSMENT</h1>

          <hr />

          <h2>PLAYER PROFILE</h2>

          <p><strong>Name:</strong> {playerData.name}</p>

          <p><strong>Playing Level:</strong> {playerData.playingLevel}</p>

          <p><strong>Batting Style:</strong> {playerData.battingStyle}</p>

          <p><strong>Batting Approach:</strong> {playerData.battingApproach}</p>

          <p><strong>Weight Preference:</strong> {playerData.weightPreference}</p>

          <p><strong>Primary Strength:</strong> {playerData.strength}</p>

          <p><strong>Development Area:</strong> {playerData.battingweakness}</p>

          <hr />

          <h2>RECOMMENDATION SUMMARY</h2>

          <p>
            Based on the submitted player profile, BatFit identified
            <strong> {result[0].batName}</strong> as the strongest overall match.
          </p>

          <p>
            Overall Compatibility Score:
            <strong> {result[0].percentage}%</strong>
          </p>

          <hr />

          <h2>RECOMMENDED EQUIPMENT</h2>

          {result.map((bat, index) => (
            <div key={index} className="report-bat">

              <h3>OPTION {index + 1}</h3>

              <p><strong>Model:</strong> {bat.batName}</p>

              <p><strong>Brand:</strong> {bat.brand}</p>

              <p><strong>Compatibility Score:</strong> {bat.percentage}%</p>

              <p><strong>Weight:</strong> {bat.weight}g</p>

              <p><strong>Budget:</strong> £{bat.budget}</p>

              <p><strong>Description:</strong> {bat.description}</p>

              <h4>Key Reasons</h4>

              {bat.reasons?.map((reason, i) => (
                <p key={i}>• {reason}</p>
              ))}

              <br />

            </div>
          ))}

          <hr />

          <h2>BATFIT ANALYSIS</h2>

          <p>
            The player profile indicates a preference for
            {" "}{playerData.battingStyle.toLowerCase()} batting
            with a {playerData.weightPreference.toLowerCase()} pickup profile.
          </p>

          <p>
            Equipment recommendations prioritise performance,
            player comfort, control and budget alignment.
          </p>

          <hr />

          <h2>DISCLAIMER</h2>

          <p>
            BatFit recommendations are generated using a profile-based
            matching engine and should be used as guidance alongside
            physical bat testing wherever possible.
          </p>

        </div>
      )}
    </div >
  )
}

export default App;