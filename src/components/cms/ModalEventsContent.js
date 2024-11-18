import React from "react";
import {now, Time, getLocalTimeZone, parseDate } from "@internationalized/date";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Chip,
    DatePicker,
    Switch
} from "@nextui-org/react";
import { ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { TimeInput } from "@nextui-org/date-input";

export default function ModalEventsContent({ type, event = null, onClose, handleEventDeletion, handleFormSubmit }) {
    const modalColor = (type === 'edit') ? 'warning' : (type === 'delete') ? 'danger' : 'primary';
    const headerText = (type === 'edit') ? 'Edit event' : (type === 'delete') ? 'Sure you want to delete this event?' : 'New event';
    const CancelButton = <Button color='default' onPress={onClose}>Cancel</Button>;

    // MODAL CONTENT - DELETE
    const BodyDelete = ({ event }) => {

        return (
            <>
            <ModalBody>
                <Card>
                    <CardHeader className="flex justify-center text-3xl text-danger-500">{event.eventName}</CardHeader>
                    <CardBody>
                        <Divider className="my-2" />
                        <div className="flex justify-between items-center text-lg">
                            <label className="font-semibold">Date: </label>
                            <span className="truncate">{event.eventDate}</span>
                        </div>
                        <Divider className="my-2" />
                        <div className="flex justify-between items-center text-lg">
                            <label className="font-semibold">Time: </label>
                            <span className="truncate">{event.eventDate}</span>
                        </div>
                        <Divider className="my-2" />
                        <div className="flex justify-between items-center text-lg">
                            <label className="font-semibold">Location: </label>
                            <span className="truncate">{event.location}</span>
                        </div>
                        <Divider className="my-2" />
                        <div className="flex justify-between items-center text-lg">
                            <label className="font-semibold">Organization: </label>
                            <span className="truncate">{event.organizationName}</span>
                        </div>
                        <Divider className="my-2" />
                        <div className="flex justify-between items-center text-lg">
                            <label className="font-semibold">Industry: </label>
                            <span className="truncate">{event.industry}</span>
                        </div>
                        <Divider className="my-2" />
                        <div className="flex justify-between items-center text-lg">
                            <label className="font-semibold">Type: </label>
                            <span className="truncate">{event.eventType}</span>
                        </div>

                    </CardBody>
                </Card>
            </ModalBody>
            <ModalFooter>
                {CancelButton}
                <Button color="danger" onPress={() => { handleEventDeletion(event.id, onClose) }}>Delete event</Button>
            </ModalFooter>
            </>
        )
    }

    // MODAL CONTENT - FORM CREATE / EDIT
    const BodyForm = ({ event }) => {

        const dtNow = now(getLocalTimeZone()).toString().slice(0,16);
        const dateTime = (event !== null) ? event.eventDate.split('T') : dtNow.split('T');
        const defaultDateInput = parseDate(dateTime[0]);
        const defaultTimeInput = new Time(...dateTime[1].split(':').map(Number))
        
        // SELECTED EVENT
        const [validateForm, setValidateForm] = React.useState(false);
        const [evt, setEvt] = React.useState((event !== null ) ? {...event, eventDate: dateTime[0], eventTime: dateTime[1],} : {
            eventId: 0,
            organizationName: '',
            eventName: '',
            eventDescription: '',
            eventDate: dateTime[0],
            eventTime: dateTime[1],
            eventLink: '',
            location: '',
            freeEvent: true,
            eventCost: 0,
            eventImage: '',
            industry: '',
            eventType: '',
            speakers: [{name: 'speaker name', company: 'speaker company'}]
        });

        const timeFormatZeros = (time) => {
            const hour = (time.hour < 10) ? '0'+time.hour : time.hour;
            const min = (time.minute < 10) ? '0'+time.minute : time.minute;
            return hour+':'+min;
        }
        

        return (
            <>
            <ModalBody>
                <form onSubmit={handleFormSubmit} className="flex flex-wrap justify-between items-center">
                    <Input label="Organization/host" 
                        value={evt.organizationName} 
                        onChange={(e) => {setEvt({...evt, organizationName: e.target.value})}} 
                        isRequired 
                        labelPlacement="outside"
                        placeholder="Organization / Host"
                        isInvalid={(validateForm && evt.organizationName === '')} 
                        errorMessage="This field is required"
                        className="max-w-md mb-4" />
                    <Input label="Event Name" 
                        value={evt.eventName} 
                        onChange={(e) => {setEvt({...evt, eventName: e.target.value})}} 
                        labelPlacement="outside"
                        placeholder="Event Name"
                        className="max-w-md mb-4" 
                        isInvalid={(validateForm && evt.eventName === '')} 
                        errorMessage="This field is required"
                        isRequired />
                    <DatePicker label="Date"  
                        onChange={(date) => {setEvt({...evt, eventDate: `${date.year}-${date.month}-${date.day}`})}} 
                        className="max-w-md mb-4" 
                        showMonthAndYearPickers 
                        hideTimeZone
                        isRequired
                        //minValue={today(getLocalTimeZone())}
                        labelPlacement="outside"
                        defaultValue={defaultDateInput} />
                    <TimeInput label="Time" 
                        className="max-w-md mb-4" 
                        defaultValue={defaultTimeInput} 
                        labelPlacement="outside"
                        hourCycle={24}
                        shouldForceLeadingZeros={true}
                        onChange={(time) => {setEvt({...evt, eventTime: timeFormatZeros(time)})}}
                        isRequired />
                    <Input label="Location" 
                        value={evt.location} 
                        onChange={(e) => {setEvt({...evt, location: e.target.value})}} 
                        isRequired 
                        isInvalid={(validateForm && evt.location === '')} 
                        errorMessage="This field is required"
                        labelPlacement="outside"
                        placeholder="Location"
                        className="max-w-md mb-4" />
                    <Input label="Image" type="file"
                        defaultValue={''} 
                        id="inputImageFile"
                        onChange={(e) => {setEvt({...evt, eventImage: e.target.value})}} 
                        isRequired 
                        isInvalid={(validateForm && evt.eventImage === '')} 
                        errorMessage="This field is required"
                        accept="image/*" 
                        labelPlacement="outside"
                        className="max-w-md mb-4" />
                    <Input label="Link" 
                        value={evt.eventLink} 
                        onChange={(e) => {setEvt({...evt, eventLink: e.target.value})}} 
                        isRequired 
                        isInvalid={(validateForm && evt.eventLink === '')} 
                        errorMessage="This field is required"
                        labelPlacement="outside"
                        placeholder="Link to the event page"
                        className="w-60 mb-4" />
                    <div className="flex flex-col justify-start items-center">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="faded" className="capitalize w-60 mb-4" color={(validateForm && evt.industry === '') ? 'danger' : 'default'}>
                                    {(evt.industry === '') ? 'Select industry' : `Industry: ${evt.industry}`}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Industry" 
                                selectionMode="single" 
                                selectedKeys={[evt.industry]} 
                                onSelectionChange={(e)=>{setEvt({...evt, industry: e.currentKey})}}
                            >
                                <DropdownItem key="Tech">Tech</DropdownItem>
                                <DropdownItem key="Energy">Energy</DropdownItem>
                                <DropdownItem key="Business">Business</DropdownItem>
                                <DropdownItem key="Support">support</DropdownItem>
                                <DropdownItem key="Others">Others</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {(validateForm && evt.industry === '') ? <span className="text-danger text-xs mb-4  -mt-4">This field is required</span> : ''}
                    </div>
                    <div className="flex flex-col justify-start items-center">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="faded" className="capitalize w-60 mb-4" color={(validateForm && evt.eventType === '') ? 'danger' : 'default'}>
                                    {(evt.eventType === '') ? 'Select type *' : `type: ${evt.eventType}`}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Type" selectionMode="single" selectedKeys={[evt.eventType]} onSelectionChange={(e)=>{setEvt({...evt, eventType: e.currentKey})}}>
                                <DropdownItem key="Meetup">Meetup</DropdownItem>
                                <DropdownItem key="Conference">Conference</DropdownItem>
                                <DropdownItem key="Showcase">Showcase</DropdownItem>
                                <DropdownItem key="General">General</DropdownItem>
                                <DropdownItem key="Networking">Networking</DropdownItem>
                                <DropdownItem key="Hackathon">Hackathon</DropdownItem>
                                <DropdownItem key="Specialization">Specialization</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {(validateForm && evt.eventType === '') ? <span className="text-danger text-xs mb-4  -mt-4">This field is required</span> : ''}
                    </div>
                    <Textarea label="Description" 
                        value={evt.eventDescription} 
                        onChange={(e) => {setEvt({...evt, eventDescription: e.target.value})}} 
                        isRequired 
                        isInvalid={(validateForm && evt.eventDescription === '')} 
                        errorMessage="This field is required"
                        labelPlacement="outside"
                        placeholder="Description"
                        className="w-full mb-4" />
                    <Switch 
                        aria-label="Is Event Free"
                        isSelected={evt.freeEvent} 
                        onChange={(e) => {setEvt({...evt, freeEvent: e.target.checked})}}
                    >
                        Is free event
                    </Switch>
                    {
                        (!evt.freeEvent) ? 
                        <Input label="Event Cost" 
                            value={evt.eventCost} 
                            type="number"
                            key={'eventCost_'}
                            onChange={(e) => {setEvt({...evt, eventCost: e.target.value})}} 
                            labelPlacement="outside"
                            placeholder="Event Cost"
                            isRequired
                            isInvalid={(validateForm && evt.eventCost === '')} 
                            errorMessage="This field is required"
                            className="max-w-xs mb-4" />
                        : ''
                    } 
                </form>
            </ModalBody>
            <ModalFooter>
                {CancelButton}
                {(type === 'new') ? <Button color="primary" onPress={() => {setValidateForm(true),handleFormSubmit(type, evt, onClose)}}>Create event</Button> : '' }
                {(type === 'edit') ? <Button color="warning" onPress={() => {setValidateForm(true),handleFormSubmit(type, evt, onClose)}}>Save changes</Button> : ''}
            </ModalFooter>
            </>
        )
    }


    return (
        <>
            <ModalHeader className="flex items-center justify-center gap-1">
                <Chip size="lg" color={modalColor}>{headerText}</Chip>
            </ModalHeader>

            {(type === 'delete') ? <BodyDelete event={event} /> : <BodyForm type={type} event={event} />}


        </>
    );
}
