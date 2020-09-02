import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { getImageFromApi, getFilmDetailFromApi } from "../API/TMDBApi";
import { BaseRouter } from "@react-navigation/native";
import { connect } from "react-redux";

function MoviesDetails(props) {
  const filmId = props.route.params.filmId;
  const [film, setFilm] = useState(null);
  useEffect(() => {
    getFilmDetailFromApi(filmId)
      .then((response) => response.json())
      .then((response) => {
        setFilm(response);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log(props);

  componentDidUpdate = () => {
    console.log("componentDidUpdate : ");
    console.log(props.favoritesFilm);
  };

  //action

  _toggleFavorite = () => {
    //on teste le changement pout rfc
    const action = { type: "TOGGLE_FAVORITE", value: film };
    props.dispatch(action); // voir si utile
  };

  return (
    <View style={styles.container}>
      {film ? (
        <View>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.poster_path) }}
          />
          <View>
            <Text>{film.title}</Text>
          </View>
          <Button title="Favoris" onPress={() => this._toggleFavorite()} />
          <View>
            <Text>{film.overview}</Text>
          </View>
          <View>
            <Text>{film.release_date}</Text>
          </View>
          <View>
            <Text>{film.vote_average}</Text>
          </View>
          <View>
            <Text>{film.buget}</Text>
          </View>

          <View>
            {film.production_companies.map((company, index) => (
              <Text key={index}>{company.name}</Text>
            ))}
          </View>
        </View>
      ) : (
        <View>
          <Text>Chargement en cours</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "column",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
});

const mapStateToProps = (state) => {
  return { favoritesFilm: state.favoritesFilm };
};

export default connect(mapStateToProps)(MoviesDetails);
