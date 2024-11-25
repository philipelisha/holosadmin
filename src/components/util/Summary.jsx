import React from 'react';
import moment from 'moment';

const Summary = ({
                   selections,
                   submitProfile,
                   saving,
                   profileExists,
                   nutritionist,
                   hideButton,
                   hideTitle,
                   profileEdited,
                   goBack,
                   getBMI
                 }) => (
  <div>
    <div className="form-wrap">
      {!hideTitle && <h2 className="bold text-center text-capitalize my-5">Resumen</h2>}
      {profileExists && !profileEdited && !nutritionist &&
        <button
          style={{width: '100%', margin: '0 0 30px'}} onClick={() => goBack(2)}
          className="text-white btn btn-site blue-button caps relative clickable">Editar</button>}
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Género</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          <div className="flex-grow-1">{selections.gender === 'male' ? 'Hombre' : 'Mujer'}</div>
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Nombres/Apellidos</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          <div className="flex-grow-1">{selections.firstName} {selections.lastName}</div>
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Email</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.email ? <div className="flex-grow-1">{selections.email}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Número de téléfono</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.phoneNumber ? <div className="flex-grow-1">{selections.phoneNumber}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Fecha de nacimiento</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          <div className="flex-grow-1">{moment(selections.birthDate).locale('es').format('MMMM DD, YYYY')}</div>
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Suplementos</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.supplements ? <div className="flex-grow-1">{selections.supplements}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Medicamentos</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.medicine ? <div className="flex-grow-1">{selections.medicine}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <hr/>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">altura</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.height ? <div className="flex-grow-1">{selections.height}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">peso</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.weight ? <div className="flex-grow-1">{selections.weight}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">IMC: </label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          <div className="flex-grow-1">{getBMI(true)}</div>
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Contacto de emergencia: </label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.emergencyContact ? <div className="flex-grow-1">{selections.emergencyContact}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Parentesco con el contacto de emergencia:</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.emergencyContactRelationship ?
            <div className="flex-grow-1">{selections.emergencyContactRelationship}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Teléfono del contacto de emergencia:</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.emergencyContactNumber ? <div className="flex-grow-1">{selections.emergencyContactNumber}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Correo del contacto de emergencia:</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.emergencyContactEmail ? <div className="flex-grow-1">{selections.emergencyContactEmail}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">cintura</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.waist ? <div className="flex-grow-1">{selections.waist}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Muñeca</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.wrist ? <div className="flex-grow-1">{selections.wrist}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Cadera</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.hip ? <div className="flex-grow-1">{selections.hip}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">% de grasa</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.fatPercent ? <div className="flex-grow-1">{selections.fatPercent}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">% de masa muscular</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.musclePercent ? <div className="flex-grow-1">{selections.musclePercent}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <hr/>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">objetivos</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          <div className="capitalize flex-grow-1">{selections.objectives.join(', ')}</div>
        </div>
      </div>
      <hr/>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Activo</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.currentActivity ? <div className="capitalize flex-grow-1">{selections.currentActivity}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">nivel</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.trainingLevel ? <div className="capitalize flex-grow-1">{selections.trainingLevel}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">veces entrenarías</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.trainingDays ? <div className="flex-grow-1">{selections.trainingDays}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">duran de entrenamientos</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.trainingTime ? <div className="flex-grow-1">{selections.trainingTime}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <hr/>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">actividades</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          <div className="capitalize flex-grow-1">{selections.activities.join(', ')}</div>
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">música</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.music.length > 0 ? <div className="capitalize flex-grow-1">{selections.music.join(', ')}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">equipo</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.equipment.length > 0 ?
            <div className="capitalize flex-grow-1">{selections.equipment.join(', ')}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <hr/>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Habits</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          <div className="capitalize flex-grow-1">{selections.habits.join(', ')}</div>
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Antecedentes Familiares</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          <div className="capitalize flex-grow-1">{selections.familyMedicalHistory.join(', ')}</div>
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Antecedentes Personales</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.personalMedicalHistory.length > 0 ?
            <div className="capitalize flex-grow-1">{selections.personalMedicalHistory.join(', ')}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Algún pasa tiempo/hobby</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.hobby ? <div className="flex-grow-1">{selections.hobby}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Estresa de Trabajo/Estudio</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.jobStress ? <div className="flex-grow-1">{selections.jobStress}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Horas que duermes</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.sleepTime ? <div className="flex-grow-1">{selections.sleepTime}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
      <div className="row" style={{display: 'flex'}}>
        <div className="col-6" style={{maxWidth: '200px', width: '200px'}}>
          <label className="bold caps">Comentarios</label>
        </div>
        <div className="col-6 d-flex" style={{maxWidth: '200px', width: '200px'}}>
          {selections.comments ? <div className="flex-grow-1">{selections.comments}</div> :
            <div className="font-light-grey flex-grow-1">- no completado -</div>}
        </div>
      </div>
    </div>
  </div>
);

export default Summary;
