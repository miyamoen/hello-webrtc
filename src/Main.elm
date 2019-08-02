module Main exposing (Model, Msg(..), init, main, update, view)

import Browser
import Element exposing (..)
import Html exposing (Html, node, option, select)
import Html.Attributes exposing (attribute, value)
import Html.Events exposing (on)
import Json.Decode as JD
import Json.Encode as JE
import Process exposing (sleep)
import Task


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }


type alias Model =
    {}


type Msg
    = NoOp


init : () -> ( Model, Cmd Msg )
init _ =
    ( {}
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    layout [ width fill, padding 32 ] <|
        column [ width fill, spacing 24 ]
            [ text "test"
            , el [ width fill ] <| html <| Html.node "camera-video" [] []
            ]
