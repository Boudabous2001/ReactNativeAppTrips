import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function AddTripModal() {

    const router = useRouter();
    const [tripTitle, setTripTitle] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [selectedImages, setSelectedImages] = useState<Array<string>>([]);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedUris = result.assets.map(asset => asset.uri);
            setSelectedImages(prevImages => [...prevImages, ...selectedUris]);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            const photoUri = result.assets[0].uri;
            setSelectedImages(prevImages => [...prevImages, photoUri]);
            console.log("Photo taken: ", photoUri);
        }
    };

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need location permissions to make this work!');
            return;
        }
        const location = await Location.getCurrentPositionAsync({});
        console.log("Current location: ", location);

        const address = await Location.reverseGeocodeAsync(location.coords);
        if (address.length > 0) {
            const addr = address[0];
            const formattedAddress = `${addr.name ? addr.name + ', ' : ''}${addr.city ? addr.city + ', ' : ''}${addr.region ? addr.region + ', ' : ''}${addr.country ? addr.country : ''}`;
            setDestination(formattedAddress);
            console.log("Resolved address: ", formattedAddress);
        }
    };


    const handleSaveTrip = () => {
        // Simulate upload process
        setIsUploading(true);

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 300);

        // Simulate saving trip data
        console.log("Trip Saved:", { tripTitle, destination, startDate, endDate, description, selectedImages });
        router.back();
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Add New Trip</Text>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.label}>Cover photo</Text>
                    <View style={styles.photoUpload}>
                        <View style={styles.photoButtons}>
                            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                                <Ionicons name="camera" size={32} color="#a855f7" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
                                <Ionicons name="image" size={32} color="#ec4899" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.photoText}>Take a photo or choose from library</Text>
                        <Text style={styles.photoSubText}>Access camera and photos</Text>
                    </View>
                </View>

                {/*Title*/}

                <View style={styles.section}>
                    <Text style={styles.label}>Trip Title</Text>
                    <TextInput
                        style={styles.input}                        
                        placeholder="Enter trip title"
                        value={tripTitle}
                        onChangeText={setTripTitle}
                    />
                    </View>

                    {/* Destination with location */}

                    <View style={styles.section}>
                        <Text style={styles.label}>Destination</Text>
                       <View>
                        <Ionicons name="location-outline" size={16} color="#6b7280" style= {styles.inputWithIcon} />
                         <TextInput
                            style={styles.input}                        
                            placeholder="City, Country"
                            value={destination}
                            onChangeText={setDestination}
                        />
                        <TouchableOpacity onPress={getLocation}>
                            <Text style={styles.gpsButton}>
                                <Ionicons name="location-outline" size={16} color="#6366f1" /> Use Current Location
                            </Text>
                        </TouchableOpacity>
                       </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    section : {
        marginBottom : 24,
    },
    content : {
        flex: 1,
        paddingHorizontal : 24,
        paddingTop : 24,
    },
    label : {
        fontSize : 14,
        color: '#6b7280',
        marginBottom : 8,
        fontWeight: '600'
    },
    photoUpload : {
        backgroundColor : '#faf5ff',
        borderRadius: 24,
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 2,
        borderStyle : 'dashed',
        borderColor : '#e9d5ff',
    },
    photoButtons : {
        flexDirection : 'row',
        gap : 16,
        marginBottom : 12,
        paddingVertical : 16,
    },
    photoButton : {
        width : 64,
        height : 64,
        borderRadius : 16,
        backgroundColor : '#fff',
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    photoText : {
        fontSize : 14,
        color : '#6b7280',
    },
    photoSubText : {
        fontSize : 12,
        color : '#9ca3af',
        marginTop : 4,
    },
    input : {
        backgroundColor : '#f9fafb',
        borderRadius : 16,
        paddingHorizontal : 16,
        paddingVertical : 12,
        fontSize : 16,
        color : '#111827',
        borderWidth : 2, 
        borderColor : 'transparent',
    }
});