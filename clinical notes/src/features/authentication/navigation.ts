import { useCallback, useMemo } from "react";

import { escapeIndexSlug } from "../../common/helpers";
import { useNavigate } from "react-router-dom";

import { FEATURE_SLUG, FEATURE_ROUTES } from "./constants";

export const useFeatureNavigation = () => {
  const navigate = useNavigate();
  const navigateToScreen = useCallback(
    (
      route: keyof typeof FEATURE_ROUTES,
      search?: string,
      replaceHistory?: boolean
    ) => {
      navigate(
        {
          pathname: `/${FEATURE_SLUG}/${escapeIndexSlug(
            FEATURE_ROUTES[route]
          )}`,
          search,
        },
        { replace: replaceHistory }
      );
    },
    [navigate]
  );

  const goBack = useCallback(() => navigate(-1), [navigate]);

  const closeFlow = useCallback(() => {
    navigate({ pathname: `/` }, { replace: true });
  }, [navigate]);

  return useMemo(
    () => ({
      closeFlow,
      goBack,
      navigateToScreen,
    }),
    [closeFlow, goBack, navigateToScreen]
  );
};
