import { Suspense, lazy, memo, useEffect } from "react";
import { Spinner } from "reactstrap";
import { useTranslation } from "react-i18next";
import PageTitle from "../../components/PageTitle";
import { cardslItems } from "../../constants";
import { useApiFetchPrice } from "../../hooks/useApiFetchPrice";
import { endpoints } from "../../utils";

import "./truckCovers.scss";

const CardsCover = lazy(() => import('../../components/CardsCover'));

const TruckCovers = memo(function TruckCovers({
  hideMain,
  handleCardTitle,
  isMobile,
}) {
  const { t } = useTranslation();
  const { pricedFetch, fetchPrice } = useApiFetchPrice();

  PageTitle(t("truck_covers_page_title"));

  useEffect(() => {
    fetchPrice(`${endpoints.truckCoversPricesUrl}`);
  }, []);

  return (
    <>
      {!hideMain && (
        <div className={`container ${isMobile ? "" : "my-4"}`}>
          {isMobile ? (
            <p className="text-wrapper mb-1">{t("main_text1")}</p>
          ) : (
            <div className="mx-4">
              <p className="text-start mb-3">{t("main_text1")}</p>
            </div>
          )}
          <Suspense fallback={<Spinner className="spinner" />}>
            {pricedFetch ? (
              <CardsCover
                handleCardTitle={handleCardTitle}
                cards={cardslItems}
                prices={pricedFetch}
                isMobile={isMobile}
              />
            ) : null}
          </Suspense>
        </div>
      )}
    </>
  );
});

export default TruckCovers;
