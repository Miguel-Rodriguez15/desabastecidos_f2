import {
  forwardRef,
  Ref,
  useState,
  ChangeEvent,
  ReactElement,
} from "react";
import {
  Avatar,
  Link,
  Box,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Theme,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden,
  CircularProgress,
  FormControl,
  Button,
  OutlinedInput,
} from "@mui/material";
import { lighten, styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import FindInPageTwoToneIcon from "@mui/icons-material/FindInPageTwoTone";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import ResultSearch from "./ResultSearch";
import { fetchData } from "../../../../../axios";
import ResultSearchDrug from "../../../../../components/Alerts/ResultSearchDrug";

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }

    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)}
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

interface SearchResult {
  nombreComercial: string;
  molecula: string;
  concentracion: string;
  fechaInicioAgotado: String;
  fechaFinAgotado: String;
}

function HeaderSearch() {
  const [loading, setLoading] = useState(false);

  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>(undefined);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  const [cache, setCache] = useState<{ [key: string]: SearchResult[] }>({});
  const handleSearchResults = (data: SearchResult[], query: string) => {
    setCache((prevCache) => ({ ...prevCache, [query]: data }));
    setSearchResults(data);
  };

  const fetchSearchResults = (query: string) => {
    setSelectedResult(null);
    setSearchResults(undefined);
    setLoading(true);

    const timeoutId = setTimeout(async () => {
      const responseData = await fetchData(`/excel/search?query=${query}`) as SearchResult[];
      handleSearchResults(responseData, query);
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value;
    setSearchValue(query);

    if (query) {
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }
      setLoading(true);
      fetchSearchResults(query);
    } else {
      setOpenSearchResults(false);
      setSearchResults([]);
      setLoading(false);
      setSelectedResult(null);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogWrapper
        open={true}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}>
        <DialogTitleWrapper>
          <FormControl variant="outlined" fullWidth>
            <OutlinedInputWrapper
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              autoComplete="off"
              placeholder="Busca tu medicamento"
              endAdornment={
                <InputAdornment position="end">
                  <ButtonSearch variant="contained" style={{ color: "#fff" }} size="small">
                    Search
                  </ButtonSearch>
                </InputAdornment>
              }
              startAdornment={
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogTitleWrapper>

        {openSearchResults && (
          <DialogContent>
            <Box
              sx={{ pt: 0, pb: 1 }}
              display="flex"
              justifyContent="space-between">
              <Typography variant="body2" component="span">
                Resultados para: {" "}
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="body1"
                  component="span">
                  {searchValue}
                </Typography>
              </Typography>
            </Box>

            {
              loading && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%">
                  <CircularProgress />
                </Box>
              )
            }

            {
              searchResults && searchResults.length === 0 ? (
                <ResultSearchDrug message={"tu medicamento puede que se encuentre disponible"} />
              ) : (
                <List disablePadding>
                  {searchResults?.map((result, index) => (
                    <ListItem
                      key={index}
                      onClick={() => handleResultClick(result)}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            background: (theme: Theme) =>
                              theme.palette.secondary.main,
                          }}>
                          <FindInPageTwoToneIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <Box flex="1">
                        <Box display="flex" justifyContent="space-between">
                          <Link
                            href="#"
                            underline="hover"
                            sx={{ fontWeight: "bold" }}
                            variant="body2">
                            {result.molecula}
                            <Typography component="span" variant="body2">
                              {" "}
                              ({result.concentracion})
                            </Typography>
                          </Link>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{
                              color: (theme: Theme) =>
                                lighten(theme.palette.secondary.main, 0.5),
                            }}>
                            {" "}
                            {result.nombreComercial}
                          </Typography>{" "}
                        </Box>
                      </Box>
                      <ChevronRightTwoToneIcon />
                    </ListItem>
                  ))}
                </List>
              )
            }
          </DialogContent>
        )}

        {selectedResult && (
          <ResultSearch
            molecula={selectedResult.molecula}
            concentracion={selectedResult.concentracion}
            nombreComercial={selectedResult.nombreComercial}
            fechaInicioAgotado={selectedResult.fechaInicioAgotado}
            fechaFinAgotado={selectedResult.fechaFinAgotado}
          />
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
