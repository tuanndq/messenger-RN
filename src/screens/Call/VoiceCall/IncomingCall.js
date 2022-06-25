import React from 'react'
import { ImageBackground, View, Text, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { images } from '../../../images'
import { defaultAvatarGroupChat } from '../../../redux/conversationSlice'
import { styles } from './styles'

const IncomingCall = () => {
    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/originals/7c/41/54/7c41548692101432c4a23f77d896a24d.jpg' }}
            style={styles.container}>
            {/* Header */}
            <View style={styles.header}>

            </View>

            {/* Body */}
            <View style={styles.body}>
                <View style={styles.bodyContainer}>
                    <Image
                        source={{ uri: defaultAvatarGroupChat }}
                        style={styles.avatar}
                    />

                    <Text style={styles.nameOfUser}>Who is calling you</Text>

                    <Text style={styles.stateCalling}>is calling you through FlashMessage...</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footerIncoming}>
                <TouchableOpacity style={styles.buttonIncoming}>
                    <Image source={images.incomingDecline} style={styles.incomingButtonImg} />
                    <Text style={styles.incomingButtonText}>DECLINE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonIncoming}>
                    <Image source={images.incomingAccept} style={styles.incomingButtonImg} />
                    <Text style={styles.incomingButtonText}>ACCEPT</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default IncomingCall