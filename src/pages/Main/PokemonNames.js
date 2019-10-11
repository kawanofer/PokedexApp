import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    StyleSheet, Text, View, Image, Dimensions, ImageBackground, StatusBar,
} from 'react-native';

class PokemonNames extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemons: this.props.pokemons
        }
    }

    componentDidMount() {
        //console.log(this.state.pokemons);

    }

    render() {
        return (
            <View style={styles.name}>
                {this.props.pokemons && this.props.pokemons.map(item => {
                    return <Text key={item.id}>{item.name}</Text>
                })}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    names: {
        backgroundColor: '#ccf',
        padding: '10px',
        color: '#ff0',
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: "wrap"
    }
})

const mapStateToProps = state => ({
    pokemons: state.pokemons,
    isFetched: state.pokemons.isFetched,
    error: state.pokemons.error,
    pokemons: state.pokemons.pokemons,
    displayedPokemons: state.pokemons.displayedPokemons,
});

export default connect(
    mapStateToProps,
    null
)(PokemonNames)