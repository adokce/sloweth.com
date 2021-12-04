import React, { Fragment, useState } from "react";
import {
  Text,
  TextInput,
  View,
  DripsyProvider,
  makeTheme,
  SafeAreaView,
  styled,
  ScrollView,
  Pressable,
} from "dripsy";
import {
  StyleSheet,
  // Text,
  // SafeAreaView,
  StatusBar,
  Platform,
  useColorScheme,
} from "react-native";
import Switch from "expo-dark-mode-switch";
import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from "@radix-ui/colors";

const lightColors = {
  ...gray,
  ...blue,
  ...red,
  ...green,
};
const darkColors = {
  ...grayDark,
  ...blueDark,
  ...redDark,
  ...greenDark,
};

const themeDark = makeTheme({
  colors: darkColors,
});

export const themeLight = {
  ...themeDark,
  colors: lightColors,
};

export default function App() {
  console.log({ darkColors, lightColors });

  const sumAmountInCurrency = sumCoinsCurrencyAmounts(coinsList).toFixed(2);

  // const currentTheme =
  const colorMode = useColorScheme();

  const [_colorMode, _setColorMode] = useState(colorMode);

  return (
    <DripsyProvider theme={_colorMode === "dark" ? themeDark : themeLight}>
      <Shell>
        <Header>
          <View sx={{ height: 40 }} />

          <View
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text>Wallet address:</Text>
              <Text>
                {walletAddress.slice(0, 7)}...{}
                {walletAddress.slice(-7)}
              </Text>
            </View>

            <Switch
              value={_colorMode === "dark" ? true : false}
              onChange={(value) => {
                if (value) {
                  _setColorMode("dark");
                } else {
                  _setColorMode("light");
                }
              }}
            />
          </View>

          <View sx={{ height: 40 }} />

          <Text>Total</Text>
          <Text
            sx={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            ${sumAmountInCurrency}
          </Text>
        </Header>

        <View sx={{ height: 40 }} />

        <Coins>
          {coinsList.map((coin) => {
            const { longName, shortName, amount, amountInCurrency } = coin;

            return (
              <Fragment key={shortName}>
                <View
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // backgroundColor: "yellow",
                  }}
                >
                  <View
                    sx={{
                      flexDirection: "column",
                      // alignItems:'center',
                      // backgroundColor: "green",
                    }}
                  >
                    {/* left */}

                    <Text
                      sx={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {shortName}
                    </Text>
                    <Text>{longName}</Text>
                  </View>

                  <View
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-end",
                      // backgroundColor: "olive",
                    }}
                  >
                    {/* right */}

                    <Text
                      sx={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      ${amountInCurrency}
                    </Text>

                    <Text>{amount}</Text>
                  </View>
                </View>

                <View sx={{ height: 20 }} />
              </Fragment>
            );
          })}
        </Coins>
      </Shell>
    </DripsyProvider>
  );
}

const Shell = styled(SafeAreaView)({
  flex: 1,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  backgroundColor: "blue6",
  // paddingLeft: 20,
  // paddingRight: 20,
  // backgroundColor: "red",
});

const Header = styled(View)({
  paddingLeft: 20,
  paddingRight: 20,
});

const Coins = styled(ScrollView)({
  paddingLeft: 20,
  paddingRight: 20,
  // flex: 1,
  // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  // backgroundColor: "blue",
});

// const Coin = styled(View)({
//   backgroundColor: "yellow",
//   flexDirection: "row",
// });

// --- Mock data ---
const walletAddress1 = "0x5312891d0c3491cf878479e93b8d0adda73891c2";
const walletAddress = walletAddress1;

const coinsList = [
  {
    shortName: "ETH",
    longName: "Ether",
    amount: "0.23",
    amountInCurrency: "327.95",
  },
  {
    shortName: "DAI",
    longName: "Multi-Collateral DAI",
    amount: "74",
    amountInCurrency: "74.24",
  },
  {
    shortName: "ZRX",
    longName: "0x Protocol Token",
    amount: "34",
    amountInCurrency: "97.31",
  },
  {
    shortName: "DNT",
    longName: "District0x Network Token",
    amount: "18",
    amountInCurrency: "9.03",
  },
  {
    shortName: "USDC",
    longName: "USD Coin",
    amount: "112",
    amountInCurrency: "112.22",
  },
  {
    shortName: "WBTC",
    longName: "Wrapped Bitcoin",
    amount: "0.04",
    amountInCurrency: "458.21",
  },
  {
    shortName: "MANA",
    longName: "Decentraland Mana",
    amount: "43",
    amountInCurrency: "158.00",
  },
  {
    shortName: "LPT",
    longName: "Livepeer Token",
    amount: "2.25",
    amountInCurrency: "458.78",
  },
  {
    shortName: "ITA",
    longName: "Izmisljeni Token Adnana",
    amount: "223.17",
    amountInCurrency: "28.32",
  },
  {
    shortName: "TTT",
    longName: "Test Token Token",
    amount: "12.25",
    amountInCurrency: "21.22",
  },
  {
    shortName: "FPT",
    longName: "FPT Token",
    amount: "28.89",
    amountInCurrency: "9.11",
  },
];

// --- Utils ---
// sum = array.reduce((pv, cv) => pv + cv, 0);

type CoinType = {
  amountInCurrency: string;
  // ...
};

const sumCoinsCurrencyAmounts = (coins: CoinType[]) => {
  const arrOfAmounts = coins.map((coin) => Number(coin.amountInCurrency));

  const result = arrOfAmounts.reduce((pv: number, cv: number) => pv + cv, 0);

  console.log({ arrOfAmounts, result });

  return result;
};
