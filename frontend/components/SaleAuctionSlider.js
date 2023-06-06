import { StyleSheet, View } from 'react-native';

export function SaleAuctionSlider() {
    return (
        <View style={styles.sliderBackground}>
            <View style={styles.sliderButton}>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sliderBackground: {
        flex: 1,
        backgroundColor: '#3F3F3F',
        borderRadius: 180,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 2,
        marginBottom: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    sliderButton: {
        flex: 1,
        backgroundColor:'#11A88E',
        borderRadius: 180,
        width: '50%',
        marginLeft: '50%'
    }
});
