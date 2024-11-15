import React from "react";
import { now, getLocalTimeZone } from "@internationalized/date";
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
        
        // SELECTED EVENT
        const [evt, setEvt] = React.useState((event !== null ) ? {...event} : {
            eventId: 0,
            organizationName: '',
            eventName: '',
            eventDescription: '',
            eventDate: now(getLocalTimeZone()),
            eventLink: '',
            location: '',
            freeEvent: true,
            eventCost: 0,
            eventImage: '',
            industry: 'Tech',
            eventType: 'Meetup',
            speakers: [{name: 'speaker name', company: 'speaker company'}]
        });
        

        return (
            <>
            <ModalBody>
                <form onSubmit={handleFormSubmit}>
                    <Input label="Organization/host" value={evt.organizationName} onChange={(e) => {setEvt({...evt, organizationName: e.target.value})}} isRequired className="max-w-xs" />
                    <Input label="Event Name" value={evt.eventName} onChange={(e) => {setEvt({...evt, eventName: e.target.value})}} className="max-w-xs" isRequired />
                    <Input label="Description" value={evt.eventDescription} onChange={(e) => {setEvt({...evt, eventDescription: e.target.value})}} isRequired className="max-w-xs" />
                    <Input label="Link" value={evt.eventLink} onChange={(e) => {setEvt({...evt, eventLink: e.target.value})}} isRequired className="max-w-xs" />
                    <Input label="Location" value={evt.location} onChange={(e) => {setEvt({...evt, location: e.target.value})}} isRequired className="max-w-xs" />
                    <Input label="Image" value={evt.eventImage} onChange={(e) => {setEvt({...evt, eventImage: e.target.value})}} isRequired className="max-w-xs" />
                    <DatePicker label="Date"  onChange={(date) => {setEvt({...evt, eventDate: `${date.year}-${date.month}-${date.day}`})}} showMonthAndYearPickers hideTimeZone />
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered" className="capitalize">{evt.industry}</Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Industry" selectionMode="single" selectedKeys={[evt.industry]} onSelectionChange={(e)=>{setEvt({...evt, industry: e.currentKey})}}>
                            <DropdownItem key="Tech">Tech</DropdownItem>
                            <DropdownItem key="Energy">Energy</DropdownItem>
                            <DropdownItem key="Business">Business</DropdownItem>
                            <DropdownItem key="Support">support</DropdownItem>
                            <DropdownItem key="Others">Others</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="bordered" className="capitalize">{evt.eventType}</Button>
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
                    <Switch isSelected={evt.freeEvent} onChange={(e) => {setEvt({...evt, freeEvent: e.target.checked})}}>Is free event</Switch>
                    {(!evt.freeEvent) && <Input label="eventCost" value={evt.eventCost} onChange={(e) => {setEvt({...evt, eventCost: e.target.value})}} className="max-w-xs" />} 
                </form>
            </ModalBody>
            <ModalFooter>
                {CancelButton}
                {(type === 'new') ? <Button color="primary" onPress={() => {handleFormSubmit(type, evt, onClose)}}>Create event</Button> : '' }
                {(type === 'edit') ? <Button color="warning" onPress={() => {handleFormSubmit(type, evt, onClose)}}>Save changes</Button> : ''}
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
