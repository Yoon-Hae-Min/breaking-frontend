import Line from 'components/Line/Line';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import { ProfileSkeleton } from 'components/Skeleton/Skeleton';
import Tabs from 'components/Tabs/Tabs';
import useProfile from 'pages/Profile/Profile/hooks/queries/useProfile';
import useProfileBookmarkedPost from 'pages/Profile/Profile/hooks/queries/useProfileBookmarkedPost';
import useProfileBoughtPost from 'pages/Profile/Profile/hooks/queries/useProfileBoughtPost';
import useProfileWrittenPost from 'pages/Profile/Profile/hooks/queries/useProfileWrittenPost';
import useCheckMyPage from 'hooks/useCheckMyPage';
import * as Style from 'pages/Profile/Profile/Profile.styles';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageUrlConverter from 'utils/ImageUrlConverter';
import FollowButton from 'components/FollowButton/FollowButton';
import ProfileFollowModal from 'pages/Profile/Profile/components/ProfileFollowModal/ProfileFollowModal';
import ProfileTabPanel from 'pages/Profile/Profile/components/ProfileTabPanel/ProfileTabPanel';
import NumberFormatter from 'utils/NumberFormatter';
import useFollow from 'hooks/mutations/useFollow';
import useUnFollow from 'hooks/mutations/useUnFollow';
import { useQueryClient } from 'react-query';

const Profile = () => {
  let { id: userId } = useParams();
  const queryClient = useQueryClient();
  const follow = useFollow(null, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
    },
  });
  const unFollow = useUnFollow(null, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
    },
  });

  const isMyPage = useCheckMyPage(userId);
  const { data: profileData, isLoading } = useProfile(userId);

  const [writtenOption, setWrittenOption] = useState('all');
  const [boughtOption, setBoughtOption] = useState('all');
  const [bookmarkedOption, setBookmarkedOption] = useState('all');

  const {
    data: writtenData,
    fetchNextPage: FetchNextWritten,
    isFetching: isWrittenFetching,
    isLoading: isWrittenLoading,
  } = useProfileWrittenPost(userId, writtenOption);

  const {
    data: boughtData,
    fetchNextPage: FetchNextBought,
    isFetching: isBoughtFetching,
    isLoading: isBoughtLoading,
  } = useProfileBoughtPost(userId, isMyPage, boughtOption);

  const {
    data: bookmarkedData,
    fetchNextPage: FetchNextBookmarked,
    isFetching: isBookmarkedFetching,
    isLoading: isBookmarkedLoading,
  } = useProfileBookmarkedPost(userId, isMyPage, bookmarkedOption);

  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const toggleFollowerModal = () => {
    setIsFollowerModalOpen((pre) => !pre);
  };
  const toggleFollowingModal = () => {
    setIsFollowingModalOpen((pre) => !pre);
  };

  return (
    <>
      <ProfileFollowModal
        isFollowerModalOpen={isFollowerModalOpen}
        isFollowingModalOpen={isFollowingModalOpen}
        toggleFollowerModal={toggleFollowerModal}
        toggleFollowingModal={toggleFollowingModal}
        userId={userId}
      />
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <Style.UserContainer>
          <ProfileImage
            size="xlarge"
            src={ImageUrlConverter(profileData?.data.profileImgURL)}
          />
          <Style.UserInformation>
            <Style.Title>
              <Style.NickName>{profileData.data.nickname}</Style.NickName>
              <FollowButton
                userId={userId}
                isFollowing={profileData.data.isFollowing}
                isMe={isMyPage}
                useFollow={follow}
                useUnFollow={unFollow}
              />
            </Style.Title>
            <Style.StatusMessage>
              {profileData.data.statusMsg}
            </Style.StatusMessage>
            <Style.Information>
              <div>작성제보 {NumberFormatter(profileData?.data.postCount)}</div>
              <div onClick={toggleFollowerModal}>
                팔로워 {NumberFormatter(profileData?.data.followerCount)}
              </div>
              <div onClick={toggleFollowingModal}>
                팔로잉 {NumberFormatter(profileData?.data.followingCount)}
              </div>
            </Style.Information>
          </Style.UserInformation>
        </Style.UserContainer>
      )}

      <Line width="100%" />

      <Style.PostInformation>
        <Tabs>
          <Tabs.TabList>
            <Tabs.TabItem>작성한 제보</Tabs.TabItem>
            {isMyPage && <Tabs.TabItem>구매한 제보</Tabs.TabItem>}
            {isMyPage && <Tabs.TabItem>북마크한 제보</Tabs.TabItem>}
          </Tabs.TabList>

          <Tabs.TabPanel>
            <ProfileTabPanel
              type="written"
              nextFetch={FetchNextWritten}
              isFetching={isWrittenFetching}
              data={writtenData}
              setOption={setWrittenOption}
              isLoading={isWrittenLoading}
            />
          </Tabs.TabPanel>

          {isMyPage && (
            <Tabs.TabPanel>
              <ProfileTabPanel
                type="bought"
                nextFetch={FetchNextBought}
                isFetching={isBoughtFetching}
                data={boughtData}
                setOption={setBoughtOption}
                isLoading={isBoughtLoading}
              />
            </Tabs.TabPanel>
          )}

          {isMyPage && (
            <Tabs.TabPanel>
              <ProfileTabPanel
                type="bookmarked"
                nextFetch={FetchNextBookmarked}
                isFetching={isBookmarkedFetching}
                data={bookmarkedData}
                setOption={setBookmarkedOption}
                isLoading={isBookmarkedLoading}
              />
            </Tabs.TabPanel>
          )}
        </Tabs>
      </Style.PostInformation>
    </>
  );
};

export default Profile;
