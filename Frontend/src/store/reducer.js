import { configureStore } from "@reduxjs/toolkit";
import RegisterUserReducer from "./Slice/auth/RegisterSlice";
import LoginReducer from "./Slice/auth/LoginSlice";
import ProfessionalReducer from "./Slice/ProfessionalSlice";
import ManageListingReducer from "./Slice/ManageListingSlice";
import AddProductReducer from "./Slice/ManageListingSlice";
import CategoryListingReducer from "./Slice/CategorieSlice";
import citiesListingReducer from "./Slice/CitiesSlice";
import CreateCityReducer from "./Slice/CreateCitySlice";
import AddCategoryListReducer from "./Slice/AddCategorySlice";
import UserListingReducer from "./Slice/userSlice";
import UpdatemangeListingBulkReducer from "./Slice/BulkListingUpdateSlice";
import ListingByCityReducer from "./Slice/GetListingByCity";
import FetchArticalReducer from "./Slice/ArticlesSlice";
import FetchNotificationsReducer from "./Slice/NotificationsSlice";
import FetchAnnouncementsReducer from "./Slice/AnnouncementsSlice";
import FetchGovermentSchmeReducer from "./Slice/GovermentSchmeSlice";
import AddArticalReducer from "./Slice/ArticlesSlice";
import GetSuccessstoriesReducer from "./Slice/SuccessstoriesSlice";
import GetCollectionReducer from "./Slice/CollectionSlice";
import GetWeatherUpdateReducer from "./Slice/WeatherUpdateSlice";
import GetLiveProgramReducer from "./Slice/LiveProgramSlice";
import GetFeedbackReducer from "./Slice/FeedbackSlice";
import farmerSliceReducer from "./Slice/FarmerSlice";
import businessSliceReducer from "./Slice/BusinessSlice";
import FetchArticalbyAutherReducer from "./Slice/ArticalByAuther";
import GetAllArticalsReducer from "./Slice/Articles/getAllArticalSlice";
import StatusArticalReducer from "./Slice/Articles/StatusByAdminSlice";
import GetAllArticalsByStatusReducer from "./Slice/Articles/getArticalByStatusSlice";
import ConsultentNotificationReducer from "./Slice/Notification/CreateNotificationSlice";
import GetConsultentNotificationReducer from "./Slice/Notification/GetConsultentNotification";
import GetConsultentNotificationByStatusReducer from './Slice/Notification/GetNotificationByStatus'

const store = configureStore({
  reducer: {
    RegisterAPI: RegisterUserReducer,
    LoginAPI: LoginReducer,
    Professional: ProfessionalReducer,
    ManageListing: ManageListingReducer,
    AddProduct: AddProductReducer,
    Category: CategoryListingReducer,
    Cities: citiesListingReducer,
    AddCity: CreateCityReducer,
    AddCategory: AddCategoryListReducer,
    AllUsers: UserListingReducer,
    BulkListing: UpdatemangeListingBulkReducer,
    ListingByCity: ListingByCityReducer,
    FetchArtical: FetchArticalReducer,
    FetchNotifications: FetchNotificationsReducer,
    FetchAnnouncements: FetchAnnouncementsReducer,
    FetchGovermentSchme: FetchGovermentSchmeReducer,
    Artical: AddArticalReducer,
    GetSuccessstories: GetSuccessstoriesReducer,
    GetCollection: GetCollectionReducer,
    GetWeatherUpdate: GetWeatherUpdateReducer,
    GetLiveProgram: GetLiveProgramReducer,
    GetFeedback: GetFeedbackReducer,
    Farmer: farmerSliceReducer,
    Business: businessSliceReducer,
    fetchArticalByAuther: FetchArticalbyAutherReducer,
    getAllArtical: GetAllArticalsReducer,
    ArticalStatus: StatusArticalReducer,
    GetAllArticalsByStatus: GetAllArticalsByStatusReducer,
    createNotification : ConsultentNotificationReducer,
    getconsultentNotificatoin : GetConsultentNotificationReducer,
    getNotificatoinByStatus : GetConsultentNotificationByStatusReducer
  },
});

export default store;
