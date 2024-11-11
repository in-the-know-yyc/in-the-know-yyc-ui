import { ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/react";
import {Card, CardHeader, CardBody} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";


export default function ModalEventsContent({ type, event = null, onClose, handleEventDeletion }) {

    console.log(event)
    const HeaderTitle = ({type}) => {
        
        const modalHeaderStyles = "flex items-center justify-center gap-1";
        
        switch(type){
            case 'edit': return (<ModalHeader className={modalHeaderStyles}><Chip  size="lg" color="warning">Edit event</Chip></ModalHeader>);
            case 'delete': return (<ModalHeader className={modalHeaderStyles}><Chip size="lg" color="danger">Sure you want to delete this event?</Chip></ModalHeader>);
            default: return (<ModalHeader className={modalHeaderStyles}><Chip size="lg" color="primary">New event</Chip></ModalHeader>);
        }
    }

    const FooterButtons = ({type, onClose}) => {

        const CancelButton = <Button color='default' onPress={onClose}>Cancel</Button>;

        switch(type){
            case 'new': return (<ModalFooter>{CancelButton}<Button color="primary">Create event</Button></ModalFooter>);
            case 'edit': return (<ModalFooter>{CancelButton}<Button color="warning">Save changes</Button></ModalFooter>);
            case 'delete': return(<ModalFooter>{CancelButton}<Button color="danger" onPress={() => {handleEventDeletion(event.id, onClose)}}>Delete event</Button></ModalFooter>);
            default: return (<ModalFooter>{CancelButton}</ModalFooter>);
        }
    }

    const BodyHandler = ({type, event}) => {
        return (type === 'delete') ? <BodyDelete event={event} /> : <BodyForm type={type} event={event} />;
    }

    const BodyDelete = ({event}) => {
        
        return(
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
        )
    }

    const BodyForm = ({event}) => {
        return(
            <ModalBody>
                <Card>
                    <CardHeader>Are you sure you want to delete this event?</CardHeader>
                    <CardBody>
                        <div className="flex justify-between items-center"><label>Date: </label><span>{event.eventDate}</span></div>
                        <div><label>Time: </label><span>{event.eventDate}</span></div>
                        <div><label>Location: </label><span>{event.location}</span></div>
                        <div><label>Organization: </label><span>{event.organizationName}</span></div>
                        <div><label>Industry: </label><span>{event.industry}</span></div>
                        <div><label>Type: </label><span>{event.eventType}</span></div>
                    </CardBody>
                </Card>
            </ModalBody>
        )
    }


    return (
        <>
            <HeaderTitle type={type} />
            
            <BodyHandler event={event || null}  type={type} />
            
            <FooterButtons type={type} onClose={onClose}  />

        </>
    );
}