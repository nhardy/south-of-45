

## census household income data
house <- read.csv("2013_mb_dataset_Total_New_Zealand_CSV/2013-mb-dataset-Total-New-Zealand-Household.csv")
house_inc <- house %>% select(
  Code,
  zerocars = X2013_Census_number_of_motor_vehicles_for_households_in_occupied_private_dwellings_No_Motor_Vehicle,
  total = X2013_Census_number_of_motor_vehicles_for_households_in_occupied_private_dwellings_Total_households_stated
) %>% mutate(
  zerocars = as.numeric(as.character(zerocars)),
  total = as.numeric(as.character(total))
  ) %>% filter(Code %in% dunedinAUs) 

## merge concordance with house_inc
AUinreg <- concordance %>% select(AU2013_code, dn_ql) %>% distinct()
car_unavail <- merge(house_inc, AUinreg, by.x = "Code", by.y="AU2013_code") %>%
    mutate(
    no_car = zerocars/total
  ) %>%
  select(Code, no_car, dn_ql)

##merge with place data
el_strs <- merge(local, car_unavail, by.x="AU2013", by.y="Code") %>%
  filter(!is.na(no_car)) %>%
  mutate(quantile = ntile(no_car, 5), colour= colour_steps[quantile]) %>%
  select(geometry, selector=dn_ql, cols=colour, value=no_car)

Qnum = 3
fivesteps = rev(c("very few", "few", "neutral", "many", "very many"))
statement= "carless households (%)"
top_of_graph(el_strs, "Mosgiel Taieri", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "East Coast", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "Saddle Hill", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "South Dunedin", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "Cargill", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()
top_of_graph(el_strs, "Hills", Qnum, statement, fivesteps, rev(colour_steps))
end_of_graph()

#####
## Transport overview: Easy to get to 
el_strs$reported <- 0
el_strs$reported[el_strs$selector == "Mosgiel Taieri"] <- 17
el_strs$reported[el_strs$selector == "East Coast"] <- 14
el_strs$reported[el_strs$selector == "Saddle Hill"] <- 0
el_strs$reported[el_strs$selector == "South Dunedin"] <- 5
el_strs$reported[el_strs$selector == "Cargill"] <- 10
el_strs$reported[el_strs$selector == "Hills"] <- 4
el_strs$value = el_strs$value * 100
png(height=480, width = 640, filename = "transport3.png", res=72)
par(mar=c(5,5,4,2)+0.1)
plot(el_strs$reported, el_strs$value, col=el_strs$cols, pch=19,
     bty="n", xlab="Survey: public transport inaccessible (%)",
     ylab="census\nhouseholds without cars (%)",
     xlim=c(min(el_strs$reported)-2,max(el_strs$reported)+5),
     main="Reported inaccessibility of public transport vs\nnumber of carless households")
labs <- el_strs %>% group_by(selector, reported) %>%
  summarise(height=3)
labs$reported[labs$selector == "Hills"] <- labs$reported[labs$selector == "Hills"] -1
labs$height[labs$selector == "Hills"] <- labs$height[labs$selector == "Hills"] +15

text(x=labs$reported,y=labs$height,labels=labs$selector,
     srt=90,pos=4, cex=1, offset=.7)
par(mar=old_par$mar)
dev.off()
