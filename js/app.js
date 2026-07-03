let performanc*Chart = null;

const startMonthSel*ct = document.getElementById("star*Month");
const endMonthSelect = do*ument.getElementById("endMonth");
*onst applyBtn = document.getElemen*ById("applyBtn");

init();

functi*n init() {
    populateMonthOption*();

    const lastIndex = statist*cs.length - 1;

    startMonthSele*t.value = statistics[lastIndex].id*
    endMonthSelect.value = statis*ics[lastIndex].id;

    renderDash*oard();

    applyBtn.addEventList*ner("click", renderDashboard);
}

*unction populateMonthOptions() {
 *  startMonthSelect.innerHTML = "";*    endMonthSelect.innerHTML = "";*
    statistics.forEach(item => {
*       const startOption = documen*.createElement("option");
        *tartOption.value = item.id;
      * startOption.textContent = item.mo*th;

        const endOption = doc*ment.createElement("option");
    *   endOption.value = item.id;
    *   endOption.textContent = item.mo*th;

        startMonthSelect.appe*dChild(startOption);
        endMo*thSelect.appendChild(endOption);
 *  });
}

function renderDashboard(* {
    const selectedData = getSel*ctedRangeData();

    if (selected*ata.length === 0) {
        alert(*ไม่พบข้อมูลในช่วงเดือนที่เลือก");
*       return;
    }

    const ca*culatedData = calculateAverageData*selectedData);

    updateTextSumm*ry(selectedData);
    updateKpiCar*s(calculatedData, selectedData.len*th);
    updateChart(selectedData)*
}

function getSelectedRangeData(* {
    const startId = startMonthS*lect.value;
    const endId = endM*nthSelect.value;

    const startI*dex = statistics.findIndex(item =>*item.id === startId);
    const en*Index = statistics.findIndex(item *> item.id === endId);

    if (sta*tIndex === -1 || endIndex === -1) *
        return [];
    }

    con*t from = Math.min(startIndex, endI*dex);
    const to = Math.max(star*Index, endIndex);

    return stat*stics.slice(from, to + 1);
}

func*ion calculateAverageData(items) {
*   return {
        onTime: {
    *       north: average(items, "onTi*e", "north"),
            west: av*rage(items, "onTime", "west"),
   *        total: average(items, "onT*me", "total")
        },

        *eliability: {
            north: a*erage(items, "reliability", "north*),
            west: average(items* "reliability", "west"),
         *  total: average(items, "reliabili*y", "total")
        },

        a*ailability: {
            north: a*erage(items, "availability", "nort*"),
            west: average(item*, "availability", "west"),
       *    total: average(items, "availab*lity", "total")
        },

      * distance: {
            north: av*rage(items, "distance", "north"),
*           west: average(items, "d*stance", "west"),
            tota*: average(items, "distance", "tota*")
        },

        trips: {
  *         north: average(items, "tr*ps", "north"),
            west: a*erage(items, "trips", "west"),
   *        total: average(items, "tri*s", "total")
        },

        c*ncelled: {
            north: aver*ge(items, "cancelled", "north"),
 *          west: average(items, "cancelled", "west"),
            total: average(items, "cancelled", "total")
        }
    };
}

function average(items, group, key) {
    const total = items.reduce((sum, item) => {
        return sum + Number(item[group][key] || 0);
    }, 0);

    return total / items.length;
}

function updateTextSummary(items) {
    const first = items[0];
    const last = items[items.length - 1];

    if (items.length === 1) {
        document.getElementById("selectedRangeText").textContent = first.month;
        document.getElementById("summaryPeriod").textContent = first.month;
        document.getElementById("calculationMode").textContent = "แสดงค่าของเดือนที่เลือก";
    } else {
        document.getElementById("selectedRangeText").textContent =
            `${first.month} - ${last.month}`;

        document.getElementById("summaryPeriod").textContent =
            `${first.month} ถึง ${last.month}`;

        document.getElementById("calculationMode").textContent =
            `ค่าเฉลี่ยจาก ${items.length} เดือน`;
    }
}

function updateKpiCards(data, monthCount) {
    const isSingleMonth = monthCount === 1;

    setText("onTimeTotal", formatPercent(data.onTime.total));
    setText("onTimeNorth", formatPercent(data.onTime.north));
    setText("onTimeWest", formatPercent(data.onTime.west));

    setText("reliabilityTotal", formatPercent(data.reliability.total));
    setText("reliabilityNorth", formatPercent(data.reliability.north));
    setText("reliabilityWest", formatPercent(data.reliability.west));

    setText("availabilityTotal", formatPercent(data.availability.total));
    setText("availabilityNorth", formatPercent(data.availability.north));
    setText("availabilityWest", formatPercent(data.availability.west));

    setText("distanceTotal", formatNumber(data.distance.total, isSingleMonth));
    setText("distanceNorth", formatNumber(data.distance.north, isSingleMonth));
    setText("distanceWest", formatNumber(data.distance.west, isSingleMonth));

    setText("tripsTotal", formatNumber(data.trips.total, isSingleMonth));
    setText("tripsNorth", formatNumber(data.trips.north, isSingleMonth));
    setText("tripsWest", formatNumber(data.trips.west, isSingleMonth));

    setText("cancelledTotal", formatNumber(data.cancelled.total, isSingleMonth));
    setText("cancelledNorth", formatNumber(data.cancelled.north, isSingleMonth));
    setText("cancelledWest", formatNumber(data.cancelled.west, isSingleMonth));
}

function setText(id, value) {
    document.getElementById(id).textContent = value;
}

function formatPercent(value) {
    const rounded = roundSmart(value);
    return `${rounded}%`;
}

function formatNumber(value, isSingleMonth) {
    const rounded = isSingleMonth
        ? Math.round(value)
        : roundSmart(value);

    return Number(rounded).toLocaleString("th-TH");
}

function roundSmart(value) {
    const rounded = Math.round(value * 100) / 100;

    if (Number.isInteger(rounded)) {
        return rounded;
    }

    return rounded.toFixed(2);
}

function updateChart(items) {
    const labels = items.map(item => item.month);

    const onTimeValues = items.map(item => item.onTime.total);
    const reliabilityValues = items.map(item => item.reliability.total);
    const availabilityValues = items.map(item => item.availability.total);

    const ctx = document.getElementById("performanceChart");

    if (performanceChart) {
        performanceChart.destroy();
    }

    performanceChart = new Chart(ctx, {
        type: "bar",

        data: {
            labels: labels,

            datasets: [
                {
                    label: "ความต่อต่อเวลา",
                    data: onTimeValues,
                    backgroundColor: "rgba(220, 38, 38, 0.82)",
                    borderColor: "rgba(220, 38, 38, 1)",
                    borderWidth: 1,
                    borderRadius: 10
                },
                {
                    label: "ความน่าเชื่อถือ",
                    data: reliabilityValues,
                    backgroundColor: "rgba(124, 58, 237, 0.82)",
                    borderColor: "rgba(124, 58, 237, 1)",
                    borderWidth: 1,
                    borderRadius: 10
                },
                {
                    label: "ความพร้อมของขบวนรถไฟ",
                    data: availabilityValues,
                    backgroundColor: "rgba(2, 132, 199, 0.82)",
                    borderColor: "rgba(2, 132, 199, 1)",
                    borderWidth: 1,
                    borderRadius: 10
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        font: {
                            family: "Sarabun",
                            size: 14,
                            weight: "bold"
                        },
                        padding: 18
                    }
                },

                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}%`;
                        }
                    }
                }
            },

            scales: {
                y: {
                    min: 90,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + "%";
                        },
                        font: {
                            family: "Sarabun"
                        }
                    },
                    grid: {
                        color: "rgba(148, 163, 184, 0.25)"
                    }
                },

                x: {
                    ticks: {
                        font: {
                            family: "Sarabun"
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}
