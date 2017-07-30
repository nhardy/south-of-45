library(readr)
library(lubridate)
library(dplyr)
dn_2yrs <- read_csv("~/Desktop/dn_2yrs.txt", skip = 8)
dn_2yrs$date_time <- ymd_hm(dn_2yrs$`Date(NZST)`)
oneyear <- dn_2yrs %>%
  filter(date_time >= ISOdatetime(2016,1,1,00,00,00),
         date_time < ISOdatetime(2017,1,1,00,00,00)) %>%
  select(date_time, airtempt = `Tair(C)`)

oneyear$colour <- "blue"
oneyear$colour[oneyear$airtempt > 15] <- "gold"
plot(oneyear$date_time,oneyear$airtempt,
     pch=19, cex=0.2, col=oneyear$colour,
     main="Dunedin temperatures for 2016 by hour",
     ylab="Temperture C", bty="n",
     xlab="Day of Year")
abline(h=15, col="#00000055")
