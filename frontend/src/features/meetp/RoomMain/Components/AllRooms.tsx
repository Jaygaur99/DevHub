import { Container, Grid } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAllRooms } from 'Services';

import { MainLoader, SingleRoomCard } from 'Components';

import { roomType } from 'Types';
import { memo } from 'react';

const AllRooms = () => {
    const { data, isLoading, isError } = useQuery(
        'rooms/getRooms',
        async () => await getAllRooms(),
        {
            retry: 1,
            // refetchOnWindowFocus: false,
            refetchInterval: 10 * 1000,
        },
    );

    if (isLoading) {
        return <MainLoader />;
    } else if (isError) {
        //
    }

    return (
        <>
            <Container paddingTop="3rem" maxW="container.xl">
                <Grid
                    templateColumns={{
                        ssm: 'repeat(1,1fr)',
                        mmd: 'repeat(2,1fr)',
                        lg: 'repeat(3,1fr)',
                        xl: 'repeat(4, 1fr)',
                    }}
                    gap="1.2rem"
                >
                    {data?.data.rooms?.map((room: roomType) => (
                        <Link
                            to={`/meetp/${room.room_id}`}
                            key={room.room_id}
                            data-testid="single-room"
                        >
                            <SingleRoomCard
                                roomName={room.name}
                                speakers={room.speakers}
                                key={room.room_id}
                            />
                        </Link>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default memo(AllRooms);
