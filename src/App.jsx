import React, { useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Grid } from "semantic-ui-react";
import Home from "./components/Home";
import Search from "./components/Search";
import { useEffect } from "react";
import { getCharacterPage } from "./store/characters/characterSlice";
import { getLocationPage } from "./store/locations/locationSlice";
import { getEpisodePage } from "./store/episodes/episodeSlice";
import { useDispatch } from "react-redux";
import Header from "./components/Header";

const api = "https://rickandmortyapi.com/api/";

function App() {
  const dispatch = useDispatch();
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    dispatch(getCharacterPage(`${api}character/?name=${searchFilter}`));
    dispatch(getLocationPage(`${api}location/?name=${searchFilter}`));
    dispatch(getEpisodePage(`${api}episode/?name=${searchFilter}`));
  }, [searchFilter]);

  return (
    <div style={{margin: "0 2%"}}>
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Search
            onFilterChange={setSearchFilter}
            searchFilter={searchFilter}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Home />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </div>
  );
}

export default App;
