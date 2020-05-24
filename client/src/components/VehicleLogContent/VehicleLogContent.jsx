import React from "react";
import LogPageErrorHeader from "../../components/LogPageErrorHeader";
import LogPageVehicleNameDisplay from "../../components/LogPageVehicleNameDisplay";
import AddLog from "../../components/AddLog";
import TopActionButtons from "../../components/TopActionButtons";
import ServiceLogBottomButtons from "../../components/ServiceLogBottomButtons";
import ServiceLogDisplay from "../../components/ServiceLogDisplay";

const VehicleLogContent = props => {
    const {
        currentTheme,
        vehicleName,
        year,
        make,
        model,
        errorMessage,
        handlePrintPage,
        changeSortOrder,
        showDeleteOneVehicleModal,
        showEditOneVehicleNameModal,
        vehicleServiceLogs,
        date,
        mileage,
        service,
        comment,
        handleChange,
        handleResetLogVehicleForm,
        checkUserEnteredServiceLogInput,
        disableAddServiceLogButton,
        sortVehicleServiceLogsMostRecent,
        sortServiceLogs,
        showEditOneServiceLogModal,
        backToTopOfPage
    } = props;

    return (
        <div className={`box ${currentTheme.background}`}>
            {
                year ?
                    (
                        <LogPageVehicleNameDisplay
                            vehicleName={vehicleName}
                            year={year}
                            make={make}
                            model={model}
                        />
                    ) : (
                        <LogPageErrorHeader
                            errorMessage={errorMessage}
                        />
                    )
            }
            <hr className={`hideWhilePrinting ${currentTheme.hr}`} />
            <TopActionButtons
                handlePrintPage={handlePrintPage}
                changeSortOrder={changeSortOrder}
                showDeleteOneVehicleModal={showDeleteOneVehicleModal}
                showEditOneVehicleNameModal={showEditOneVehicleNameModal}
                vehicleServiceLogs={vehicleServiceLogs}
                year={year}
            />
            <hr className={currentTheme.hr} />
            <div className="hideWhilePrinting">
                <AddLog
                    year={year}
                    date={date}
                    mileage={mileage}
                    service={service}
                    comment={comment}
                    handleChange={handleChange}
                    handleResetLogVehicleForm={handleResetLogVehicleForm}
                    checkUserEnteredServiceLogInput={checkUserEnteredServiceLogInput}
                    disableAddServiceLogButton={disableAddServiceLogButton}
                />
                {
                    year ?
                        (
                            <hr className={currentTheme.hr} />
                        ) : (
                            null
                        )
                }
            </div>
            <div className="row innerBox serviceLogMobileDisplay">
                {
                    vehicleServiceLogs.length === 0 ?
                        (
                            <div className="col-md-12 text-center">
                                <label><strong>No Service Logs on Record</strong></label>
                            </div>
                        ) : (
                            <ServiceLogDisplay
                                sortVehicleServiceLogsMostRecent={sortVehicleServiceLogsMostRecent}
                                currentTheme={currentTheme}
                                sortServiceLogs={sortServiceLogs}
                                showEditOneServiceLogModal={showEditOneServiceLogModal}
                            />
                        )
                }
            </div>
            <ServiceLogBottomButtons
                vehicleServiceLogs={vehicleServiceLogs}
                backToTopOfPage={backToTopOfPage}
                currentTheme={currentTheme}
            />
        </div>
    );
};

export default VehicleLogContent;
