import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, favorites, setFavorits }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  //state state variable which well call selected countries
  const [selectedCountries,setSelectedCountries]= useState([]);
  const [selectedUsers, setSelectedUsers]= useState(users);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };
  //do something after render and we can fetch data from api
  useEffect(() => {
    if(users && selectedCountries && selectedCountries.length == 0) {
      setSelectedUsers(users);
    }   
    else {
      setSelectedUsers(users.filter(user => selectedCountries.includes(user.location.country)));
    }
  },[selectedCountries,users]);

  const handleSelectCountries = (country) => {
    if (!selectedCountries.includes(country)) {
      setSelectedCountries([country, ...selectedCountries]);
    }
    else {
      setSelectedCountries(selectedCountries.filter(selectedCountry => selectedCountry != country));
    }
  }

  const handleClickOnHeart = (index) => {
    if (!favorites) {
      setFavorits([selectedUsers[index]]);
    }
    else {
      if (favorites.includes(selectedUsers[index])) {
        setFavorits(favorites.filter( favorite => favorite != selectedUsers[index]));
      }
      else {
        setFavorits([...favorites, selectedUsers[index]]);
      } 
    }
  }

  const checkConditionToVisible = (index, user) => {
    return index === hoveredUserId || (favorites && favorites.includes(user));
  }

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="Brazil" label="Brazil" onChange={handleSelectCountries} />
        <CheckBox value="Australia" label="Australia" onChange={handleSelectCountries} />
        <CheckBox value="Canada" label="Canada" onChange={handleSelectCountries} />
        <CheckBox value="Germany" label="Germany" onChange={handleSelectCountries} />
        <CheckBox value="Turkey" label="Turkey" onChange={handleSelectCountries} />
        <CheckBox value="France" label="France" onChange={handleSelectCountries} />
      </S.Filters>
      <S.List>
        {selectedUsers.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={checkConditionToVisible(index, user)} onClick={()=>{handleClickOnHeart(index)}} >
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
