import { Pressable, Text, View, StyleSheet } from 'react-native';

export function PostButton() {
    return (
        <View>
            <Pressable onPress={() => {console.log("Posteado!")}} style={styles.button}>
                <Text style= {styles.text}>
                    Post
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "monospace", 
        color: "#DEDEDE",
    },
    button: {
        backgroundColor: '#11A88E',
        width: 80,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
});