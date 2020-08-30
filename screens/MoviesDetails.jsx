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

export default function MoviesDetails(props) {
  const filmId = props.route.params.film.id;
  const [film, setFilm] = useState(null);
  useEffect(() => {
    getFilmDetailFromApi(filmId)
      .then((response) => response.json())
      .then((response) => {
        setFilm(response);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <View style={styles.container}>
      {film ? (
        <View>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.poster_path) }}
          />
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
