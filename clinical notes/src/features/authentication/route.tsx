import { FEATURE_SLUG } from "./constants";
import { AuthenticationFeature } from "./feature";

export default {
  path: `/${FEATURE_SLUG}/*`,
  element: <AuthenticationFeature />,
};
