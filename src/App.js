import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Axios from "axios";
import map from "./assets/map-marker-alt-solid.svg";
import mail from "./assets/envelope-regular.svg";
import bookmark from "./assets/bookmark-regular.svg";

function App() {
  const [text, setText] = useState("");
  const [profile, setProfile] = useState({});
  const [repo, setRepo] = useState([]);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  function changeText(e) {
    setText(e.target.value);
  }

  function search() {
    Axios.get(`https://api.github.com/users/${text}`)
      .then((response) => {
        console.log(response);
        setError(false);
        setProfile(response.data);
        Axios.get(response.data["repos_url"]).then((response) => {
          console.log(response);
          setRepo(response.data);
          setText("");
        });
      })
      .catch((e) => {
        setError(true);
      });
  }

  return (
    <div className="App">
      <div className="container">
        <input
          type="text"
          onChange={(e) => changeText(e)}
          placeholder="Search or jump to..."
          className="input"
          value={text}
        ></input>
        <button onClick={search} className="btn_click">
          Search
        </button>
      </div>
      {error ? (
        <div>No User Found !</div>
      ) : (
        profile.name && (
          <div className="profile-container">
            <div className="left-info">
              <img src={profile.avatar_url} className="profile_pic"></img>
              <div className="name">{profile.name}</div>
              <div className="username">{profile.login}</div>
              <div className="bio">{profile.bio}</div>
              <div className="location">
                <img src={map} className="location-img" />
                <div className="location-txt">{profile.location}</div>
              </div>
              <div className="email">
                <img src={mail} className="mail-img" />
                <div className="mail-txt">{profile.email}</div>
              </div>
              <div className="follower">Followers {profile.followers}</div>
              <div className="following">Following {profile.following}</div>
            </div>
            <div className="right-info">
              <div>
                <h3>Repositories</h3>
              </div>
              <div className="display">
                {repo && repo.length ? (
                  repo.map((item) => {
                    return (
                      <div className="repos">
                        <div className="name-container">
                          <img src={bookmark} className="bookmark"></img>
                          <div className="repo-names">
                            <a href={item["html_url"]}>{item.name}</a>
                          </div>
                        </div>
                        <div className="desc">{item.description}</div>
                        <div className="language">{item.language}</div>
                      </div>
                    );
                  })
                ) : (
                  <div>No Repositories Found !</div>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
