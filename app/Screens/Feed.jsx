import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, PanResponder, TouchableOpacity, Dimensions, Platform, StyleSheet } from 'react-native';
import { API } from '../services/api';
import { Video, ResizeMode } from 'expo-av';
import { navReset } from '../utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';


const screenHight = Dimensions.get('window').height
const Feed = ({ navigation }) => {
    let requestCount = 2;
    const source_url = 'https://firebasestorage.googleapis.com/v0/b/glowupfans.appspot.com/o/video-feeds%2F';
    const [feed, setFeed] = useState([]);
    const [lastData, setLastData] = useState();
    const [status, setStatus] = useState({});
    const video = useRef(null);
    useEffect(() => {
        checkUser();
        fetchFeed('');
    }, []);

    const checkUser = async () => {
        try {
            const response = await API.get('me');
            const data = response.data;
            console.log(data, 'data');
        } catch (error) {
            console.log(error);
            alert('Session expired!, Please login again');
            navReset('SignIn', navigation);
        }
    }

    const fetchFeed = async (paginate) => {
        const response = await API.get('videofeed' + paginate);
        let data = response.data?.data;
        console.log(response.data.links, 'data');
        setFeed(data);
        setLastData(response.data?.links);
    }

    useEffect(() => {
        if (feed.length > 0) {
            setTimeout(() => {
                video.current.playAsync();
            }, 100);
        }
    }, [feed]);

    const handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        // find if the scroll is going up or down

        if (contentOffset.y > 60) {
            // scroll down
            if (requestCount == 2) {
                requestCount = 3;
                if (lastData.last == null) return;
                let finalParams = lastData.last.split('?')[1];

                API.get('videofeed?' + finalParams)
                    .then(res => {
                        let data = res.data?.data;
                        console.log(data, 'data');
                        setFeed(data);
                        requestCount = 2;
                    })
            }
        }

        if (contentOffset.y < 60) {
            // scroll up
            if (requestCount == 2) {
                requestCount = 3;
                if (lastData.next == null) return;
                let finalParams = lastData.next.split('?')[1];

                API.get('videofeed?' + finalParams)
                    .then(res => {
                        let data = res.data?.data;
                        console.log(res.data, 'data');
                        setFeed(data);
                        requestCount = 2;
                    })
            }
        }
    }

    const handleDrawer = () => {
        console.log('open drawer');
        navigation.openDrawer();
        // navigate('Create Post')
        // navigation.openDrawer();
        // this.props.navigation.openDrawer();
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <PageTopBar openDrawer={handleDrawer} />
            <FlatList
                snapToInterval={Platform.OS === 'ios' ? screenHight * 0.85 : screenHight * 0.87}
                onScroll={handleScroll}
                style={{ width: '100%' }}
                data={feed}
                horizontal={false}
                renderItem={({ item }) => (
                    <View
                        style={{
                            width: '100%',
                            height: Platform.OS === 'ios' ? screenHight * 0.85 : screenHight * 0.87,
                            // '75%' : '77%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 2,
                            elevation: 1
                        }}
                    >
                        <Video
                            ref={video}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            source={{
                                // uri: source_url + 'test.mp4',
                                uri: 'https://firebasestorage.googleapis.com/v0/b/glowupfans.appspot.com/o/video-feeds%2F' + item.video_file + '?alt=media&token=0b897620-21c3-4013-9279-40f068928647',
                            }}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping
                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                        />
                        <ReactionBar />
                    </View>
                )}
                keyExtractor={(item) => item.id}
            // pagingEnabled
            />
        </View>
    );
}

const PageTopBar = ({ openDrawer }) => {

    return (
        <View
            style={{
                width: '100%',
                height: Platform.OS === 'ios' ? '15%' : '13%',
                backgroundColor: '#ffc300',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingHorizontal: 20,
                paddingVertical: 25,
            }}
        >
            <TouchableOpacity onPress={openDrawer}>
                <Ionicons name="menu-outline" size={30} color="black" />
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 20,
                }}
            >
                <Text
                    style={{
                        fontFamily: 'RCRegular',
                        fontSize: 18,
                        textDecorationLine: 'underline',
                    }}
                >
                    For You
                </Text>
                <Text
                    style={{
                        fontFamily: 'RCRegular',
                        fontSize: 18,
                        textDecorationLine: 'underline',
                    }}
                >
                    Discover
                </Text>
            </View>

            <TouchableOpacity
            // onPress={() => navReset('SignIn')}
            >
                <Ionicons name="search-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const ReactionBar = () => {
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [shareCount, setShareCount] = useState(0);

    const handleLike = () => {
        setLikeCount(likeCount + 1);
    }

    const handleComment = () => {
        setCommentCount(commentCount + 1);
    }

    const handleShare = () => {
        setShareCount(shareCount + 1);
    }

    return (
        <View style={styles.reactionContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setLikeCount(likeCount + 1)}>
                <Ionicons name="heart" size={32} color="#FFF" />
                <Text style={styles.text}>{likeCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCommentCount(commentCount + 1)}>
                <Ionicons name="ios-chatbubble-ellipses-outline" size={32} color="#FFF" />
                <Text style={styles.text}>{commentCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShareCount(shareCount + 1)}>
                <Feather name="send" size={32} color="#FFF" />
                <Text style={styles.text}>{shareCount}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    reactionContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#0000005A',
        borderRadius: 10,
        bottom: 30,
        right: 10,
    },
    button: {
        // padding: 10,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        color: '#FFF',
        fontFamily: 'RCRegular',
    },
});

export default Feed;