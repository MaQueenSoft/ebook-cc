
import { Provider } from "react-redux";
import RoutesConfig from "./routes/Routes";
import store from "./redux/store";

const App = () => {

  return (
    <Provider store={store}>
      <RoutesConfig />
    </Provider>
  );
};

export default App;
