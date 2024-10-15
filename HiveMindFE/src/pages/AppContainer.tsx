import { useCallback, useEffect, useState } from "react";
import Sidebar from "../shared/components/Sidebar/Sidebar";
import { UserContext } from "../shared/context/UserContext";
import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "../shared/models/JWTPayload.model";
import { User } from "../shared/models/User.model";
import { Outlet, useSearchParams } from "react-router-dom";
import { getUserData } from "../services/UserService";
import { SearchFilterContext } from "../shared/context/SearchFilterContext";
import TopBottomBar from "../shared/components/TopBottomBar/TopBottomBar";
import FilterTypeButton from "../shared/components/FilterTypeButton/FilterTypeButton";
import { Idea } from "../shared/models/Idea.model";
import { AddIdeaContext } from "../shared/context/FuncAddIdeaContext";

export default function AppContainer() {
  const [userData, setUserData] = useState<User | null>(null);
  const [addIdeaFunc, setAddIdeaFunc] = useState<((idea: Idea) => void) | undefined>(undefined);
  const [searchFilterType, setSearchFilterType] = useSearchParams();

  const changeUserDataContext = useCallback((user: User) => {
    setUserData(user);
  }, []);

  const setAddIdea = useCallback((callback: (idea: Idea) => void) => {
    setAddIdeaFunc(() => callback);
  }, []);

  const changeSearchFilterTypeContext = useCallback((searchType: string) => {
    const newUrlSearchParams = new URLSearchParams({ type: searchType });
    setSearchFilterType(newUrlSearchParams);
  }, []);

  useEffect(() => {
    if (!searchFilterType.has("type")) {
      changeSearchFilterTypeContext("controversial");
    }
  }, []);

  const fetchUserData = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<JWTPayload>(token);
      getUserData(decodedToken.user.id).then((response) => setUserData(response.data));
    }
  }, []);

  useEffect(fetchUserData, [fetchUserData]);

  return (
    <UserContext.Provider value={{ user: userData, setUser: changeUserDataContext }}>
      <SearchFilterContext.Provider
        value={{ filterType: searchFilterType.get("type"), setFilterType: changeSearchFilterTypeContext }}
      >
        <AddIdeaContext.Provider value={{ addIdea: addIdeaFunc, setAddIdea: setAddIdea }}>
          <div className="lg:grid lg:grid-cols-12 lg:grid-rows-1 ">
            <Sidebar direction="left" />

            <TopBottomBar direction="top" />
            <FilterTypeButton />
            <div className={`lg:col-start-3 lg:col-span-7 `}>
              <Outlet />
            </div>
            <Sidebar direction="right" />
            <TopBottomBar direction="bottom" />
          </div>
        </AddIdeaContext.Provider>
      </SearchFilterContext.Provider>
    </UserContext.Provider>
  );
}
