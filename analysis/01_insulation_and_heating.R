

## census household income data
house <- read.csv("2013_mb_dataset_Total_New_Zealand_CSV/2013-mb-dataset-Total-New-Zealand-Household.csv")
house_inc <- house %>% select(
  Code,
  Income01 = X2001_Census_total_household_income_.grouped..2..3..4._for_households_in_occupied_private_dwellings_Median_household_income_....18..23.,
  Income06 = X2006_Census_total_household_income_.grouped..2..3..4._for_households_in_occupied_private_dwellings_Median_household_income_....18..23.,
  Income13 = X2013_Census_total_household_income_.grouped..2..3..4._for_households_in_occupied_private_dwellings_Median_household_income_....18..23.
) %>% filter(Code %in% dunedinAUs) 

## merge concordance with house_inc
AUinreg <- concordance %>% select(AU2013_code, dn_ql) %>% distinct()
power_income <- merge(house_inc, AUinreg, by.x = "Code", by.y="AU2013_code") %>%
  mutate(
    power_of_income_06 = 17.6/as.numeric(as.character(Income06)),
    power_of_income_13 = 23.4/as.numeric(as.character(Income13))
  ) %>%
  select(Code, power_of_income_06, power_of_income_13, dn_ql)


##merge with place data
el_strs <- merge(local, power_income, by.x="AU2013", by.y="Code") %>%
  filter(!is.na(power_of_income_13)) %>%
  mutate(quantile = ntile(power_of_income_13, 5), colour= colour_steps[quantile]) %>%
  select(geometry, selector=dn_ql, cols=colour, value=power_of_income_13)

Qnum = 1
fivesteps = rev(c("highly able", "able", "neutral", "inable", "highly inable"))
statement= "abilty to afford heating"
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
## Cannot afford to heat home 
el_strs$reported <- 0
el_strs$reported[el_strs$selector == "Mosgiel Taieri"] <- 15
el_strs$reported[el_strs$selector == "East Coast"] <- 18
el_strs$reported[el_strs$selector == "Saddle Hill"] <- 7
el_strs$reported[el_strs$selector == "South Dunedin"] <- 29
el_strs$reported[el_strs$selector == "Cargill"] <- 22
el_strs$reported[el_strs$selector == "Hills"] <- 25
png(height=480, width = 640, filename = "insulation1.png", res=72)
par(mar=c(5,5,4,2)+0.1)
plot(el_strs$reported, el_strs$value, col=el_strs$cols, pch=19,
     bty="n", xlab="Survey: cannot heat their house (%)",
     ylab="census + electricity authority:\nmedian income power affordability struggle",
     xlim=c(min(el_strs$reported)-5,max(el_strs$reported)+5),
     main="Reported difficulty of keeping house warm vs\ndemographic ability to pay for power")
labs <- el_strs %>% group_by(selector, reported) %>%
  summarise(height=3e-04)
text(x=labs$reported,y=labs$height,labels=labs$selector,
     srt=90,pos=4, cex=1, offset=.7)
par(mar=old_par$mar)
dev.off()