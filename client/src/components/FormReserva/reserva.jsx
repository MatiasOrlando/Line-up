import Image from "next/image";
import desplegableAbajo from "../../assets/desplegable-abajo.svg";

export default function FormReserva() {
  return (
    <>
      <div className="bg-grey2">
        <h1 className="reserva-title">Hacer una reserva</h1>
        <div className="content-container">
          <div className="reserva-form-container">
            <h2 className="reserva-title-2">Reserva</h2>
            <h3 className="reserva-title-3">Seleccioná tu sucursal</h3>
            <p>form check</p>
            <h3 className="reserva-title-3">Sucursal</h3>
            <select className="input-primary eleven" />
          </div>
          <div className="calendar-container">
            <h2 className="reserva-title-2">Mes Año</h2>
            <ol>
              <li className="day-name">Do</li>
              <li className="day-name">Lu</li>
              <li className="day-name">Ma</li>
              <li className="day-name">Mie</li>
              <li className="day-name">Ju</li>
              <li className="day-name">Vi</li>
              <li className="day-name">Sa</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>10</li>
              <li>11</li>
              <li>12</li>
              <li>13</li>
              <li>14</li>
              <li>15</li>
              <li>16</li>
              <li>17</li>
              <li>18</li>
              <li>19</li>
              <li>20</li>
              <li>21</li>
              <li>22</li>
              <li>23</li>
              <li>24</li>
              <li>25</li>
              <li>26</li>
              <li>27</li>
              <li>28</li>
              <li>29</li>
              <li>30</li>
              <li>31</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
