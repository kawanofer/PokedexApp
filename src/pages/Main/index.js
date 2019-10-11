import React, { Fragment, Component } from 'react';
import * as _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { SetPokemons, GetPokemons, FilterPokemons } from '../../store/actions';

import {
	FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Dimensions, ImageBackground, StatusBar,
} from 'react-native';

import { SearchBar, Divider } from 'react-native-elements';

class Main extends Component {
	state = {
		search: "",
		isFetched: false,
		error: null,
		pokemons: [],
		displayedPokemonsData: null
	}

	componentDidMount() {
		this.props.GetPokemons();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.pokemons !== this.props.pokemons) {
			this.setState({ displayedPokemonsData: this.props.pokemons });
		}

		if (prevState.search !== this.state.search) {
			const displayedPokemons = this.state.displayedPokemonsData.filter(pokemon => {
				return pokemon.name.toLowerCase().includes(this.state.search.toLowerCase())
			});
			this.setState({ displayedPokemonsData: displayedPokemons });
		}
	}

	updateSearch = search => {
		this.setState({ search });
	};

	clearSearch = () => {
		this.setState({ search: "" });
		this.setState({ displayedPokemonsData: this.props.pokemons });
	};

	renderHeader = () => {
		return <SearchBar
			onChangeText={_.throttle(this.updateSearch, 1000)}
			onClear={this.clearSearch}
			value={this.state.search}
			placeholder="Search..."
			lightTheme />;
	};

	render() {
		const { displayedPokemonsData } = this.state;
		return (
			<SafeAreaView>
				<Text style={styles.title}>POKEDEX</Text>

				{displayedPokemonsData &&

					<FlatList
						data={displayedPokemonsData}
						keyExtractor={item => item.id}
						numColumns={2}
						platform="default"
						ListHeaderComponent={this.renderHeader}
						renderItem={({ item }) => {
							return (
								<View style={styles.item}>
									<Text style={styles.number}>{item.id}</Text>
									<View style={styles.imageContainer}>
										<Image style={styles.image} source={{ uri: item.image }} />
									</View>
									<Text style={styles.text}>{_.capitalize(item.name)}</Text>
								</View>
							);
						}}
					/>

				}
			</SafeAreaView>
		)
	}
};


const styles = StyleSheet.create({
	names: {
		color: "#FF0000",
		backgroundColor: '#ccf',
		// padding: '10px',
		// color: '#ff0',
		// display: 'flex',
		// flexDirection: "row",
		// justifyContent: 'space-between',
		// alignItems: 'center',
		// flexWrap: "wrap"
	},

	title: {
		fontSize: 20,
		textAlign: "center",
		marginTop: 10,
		marginBottom: 10
	},

	number: {
		textAlign: "center",
		padding: 10,
		fontWeight: 'bold',
	},

	item: {
		backgroundColor: '#eee',
		flexGrow: 1,
		margin: 10,
		flexBasis: 0,
	},

	text: {
		backgroundColor: "#08993a",
		color: "#fff",
		textAlign: "center",
		fontSize: 14,
		paddingTop: 5,
		paddingBottom: 5
	},

	imageContainer: {
		alignItems: "center"
	},

	image: {
		width: 50,
		height: 50
	}
})

const mapStateToProps = state => ({
	pokemons: state.pokemons,
	isFetched: state.pokemons.isFetched,
	error: state.pokemons.error,
	pokemons: state.pokemons.pokemons,
	displayedPokemons: state.pokemons.displayedPokemons,
});

const mapDispatchToProps = dispatch => bindActionCreators(
	{ SetPokemons, GetPokemons, FilterPokemons }
	, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main)